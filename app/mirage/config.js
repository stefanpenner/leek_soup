import Response from 'ember-cli-mirage/response';
import Ember from 'ember';
import validateEmail from 'smhw-frontend/utils/validate-email';
import Mirage from 'ember-cli-mirage';


const { isBlank, compare } = Ember;
let defaultUserIdPerType = {
  student: 991,
  employee: 9991,
  parent: 1
};

function parseQueryString(queryString) {
    var params = {}, queries, temp, i, l;

    queries = queryString.split("&");

    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }

    return params;
}

// this will convert any value from '' to null
// to follow the same behaviour in our API that goes like
// ?published&something=else resolving in { published: nil, something: else }
// we can keep this utility function to replicate how params are parsed in our API
function railsParseParams(params) {
  const obj = {};

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      let coerscedValue;
      let coerscedKey = key;

      if (params[key] === '') {
        coerscedValue = null;

       } else if (params[key] === 'false') {
        coerscedValue = false;

       } else if (params[key] === 'true') {
        coerscedValue = true;

       } else if (key.includes('[') && key.includes(']')) {

        // this will built a composite private key that we can then implement in our fixtures;
        // so filtering can be simpler;

        let baseKey   = key.split('[').objectAt(0);
        let nestedKey = key.split('[').objectAt(1).split(']').objectAt(0);

        coerscedKey   = `__${baseKey}_${nestedKey}`;
        coerscedValue = params[key];
       } else {
        coerscedValue = params[key];
       }

      obj[coerscedKey] = coerscedValue;
    }
  }
  return obj;
}


const coalesceFilterSortAndPaginate_specialKeys = ['filter', 'limit', 'offset', 'sort'];

function coalesceFilterSortAndPaginate_extractConditions(req) {
  const params = railsParseParams(req.queryParams);
  return Object.keys(params).reduce((obj, key) => {
    if (!coalesceFilterSortAndPaginate_specialKeys.includes(key)) {
      obj[key] = params[key];
    }
    return obj;
  }, {});
}

function coalesceFilterSortAndPaginate_filter(collection, conditions, { filterFields }, db, req) {
  let results = collection.where(conditions);
  let filter = req.queryParams.filter;

  if (filter) { // `filter` is special because searches by substring
    if (!filterFields) {
      throw new Error('Endpoint received a filter parameter but no filter strategy was configured');
    }
    filter = filter.toLowerCase();
    results = results.filter(record => {
      const values = filterFields.map(key => record[key]);
      return values.join(' ').toLowerCase().includes(filter);
    });
  }
  return results;
}

function coalesceFilterSortAndPaginate_sort(results, req) {
  const sort = Ember.makeArray(req.queryParams.sort);
  if (sort.length > 0) {
    return results.sort((a, b) => {
      for (let i = 0; i < sort.length;  i++) {
        let key = sort[i];
        let multiplier = 1;
        if (key[0] === '-') { // Reverse order: p.e `?sort=-created_at`
          key = key.slice(1);
          multiplier = -1;
        }
        const comp = compare(a[key], b[key]);
        if (comp !== 0) {
          return multiplier * comp;
        }
        return comp;
      }
    });
  } else {
    return results;
  }
}

function coalesceFilterSortAndPaginate_paginate(results, limit, offset) {
  const limitNum = parseInt(limit);
  const offsetNum = parseInt(offset) || 0;
  return results.slice(offsetNum, offsetNum + limitNum);
}

function coalesceFilterSortAndPaginate(type, opts) {
  const { filterFn = coalesceFilterSortAndPaginate_filter } = opts; // jshint ignore:line
  const normalizedCollectionType = type.pluralize().underscore();
  return function(db, req) {
    const params = railsParseParams(req.queryParams);
    const collection = db[normalizedCollectionType];
    let { ids, limit, offset = 0, sort } = params; // jshint ignore:line
    const payload = {};

    // Coalesced find
    if (ids) {
      return { [normalizedCollectionType]: collection.find(ids).compact() };
    }

    // Filtering
    const conditions = coalesceFilterSortAndPaginate_extractConditions(req);
    let results = filterFn(collection, conditions, opts, db, req);

    // Sorting
    results = coalesceFilterSortAndPaginate_sort(results, req);

    // Pagination
    results = coalesceFilterSortAndPaginate_sort(results, req);
    if (limit) {
      payload.meta = { selection_count: results.length };
      results = coalesceFilterSortAndPaginate_paginate(results, limit, offset);
    }

    payload[normalizedCollectionType] = results;
    return payload;
  };
}

function getAssignment(db, submission) {
  return submission.homework_id && db.homeworks.find(submission.homework_id) ||
    submission.class_test_id && db.class_tests.find(submission.class_test_id) ||
    submission.differentiated_homework_id && db.differentiated_homeworks.find(submission.differentiated_homework_id) ||
    submission.quiz_id && db.quizzes.find(submission.quiz_id);
}

function filterSubmissions(submissions, db, req) {
  const { teacher, subject, status } = req.queryParams;
  const filterText = req.queryParams.filter && req.queryParams.filter.toLowerCase();
  return submissions.filter(function(submission) {
    const assignment = getAssignment(db, submission);
    let result = (!filterText || assignment.title.includes(filterText)) &&
      (!teacher || assignment.teacher_id === parseInt(teacher, 10)) &&
      (!subject || assignment.subject === subject);
    if (!result) { return; }
    let submissionStatus = submission.status;
    if (submission.quiz_id) {
      const questions = db.quiz_submission_questions.find(submission.question_ids);
      const completedOnce = questions.every(q => q.attempt1 && q.attempt1.answer);
      submissionStatus = completedOnce ? 'submitted' : 'not-submitted';
    }
    return !status || submissionStatus === status;
  });
}

function paginate(records, req, { sortKey, order } = {}) {
  sortKey = sortKey || 'created_at';
  order   = order || 'asc';
  const offset = parseInt(req.queryParams.offset || 0, 10);
  const limit = parseInt(req.queryParams.limit, 10);
  let sortedRecords = records.sortBy(sortKey);
  if (order === 'desc') {
    sortedRecords = sortedRecords.reverse();
  }
  return sortedRecords.slice(offset, offset + limit);
}

function updateManualGradeableSubmission(modelName) {
  const collectionName = modelName.pluralize();
  return function(db, req) {
    let id = req.url.match(/\d+-\d+/)[0];
    let newData = JSON.parse(req.requestBody)[modelName];
    let submission = db[collectionName].find(id);

    let createGradeEvent = false;
    let createStatusEvent = false;

    if (newData.grade !== submission.grade) {
      createGradeEvent = true;
    }

    if(newData.status !== submission.status) {
      createStatusEvent = true;
    }

    if (createGradeEvent) {
      let newGradeEvent = {
        submission_id: id,
        teacher_id: 9991,
        content: newData.grade,
        event_type: 'grade',
        created_at: Date.now(),
        updated_at: Date.now()
      };

      let lastSubmissionEvent = db.submission_events.insert(newGradeEvent);
      submission.event_ids.push(lastSubmissionEvent.id);
    }

    if (createStatusEvent) {
      let newStatusEvent = {
        submission_id: id,
        teacher_id: 9991,
        content: newData.status,
        event_type: 'status',
        created_at: Date.now(),
        updated_at: Date.now()
      };

      let lastSubmissionEvent = db.submission_events.insert(newStatusEvent);
      submission.event_ids.push(lastSubmissionEvent.id);
    }

    db[collectionName].update(id, newData);

    return { [modelName]: submission };
  };
}

// Assignments may receive a `published: true/false/null` attribute that doesn't match any
// attribute in the DB, but rather means that the `published_at` field can/cannot be null,
// so they need a slightly customized filter function.
function filterPublishedAssignmentType(collection, conditions, opts, db, req) {
  const published = conditions.published;
  delete conditions.published;

  if (published === null) {
    return coalesceFilterSortAndPaginate_filter(collection, conditions, opts, db, req);
  }
  return coalesceFilterSortAndPaginate_filter(collection, conditions, opts, db, req)
    .filter(e => published ? e.published_at !== null : e.published_at === null);
}

function findUser(db, user_private_info_id) {
  let type, user;
  if (!user_private_info_id) {
    user = type = null;
  } else if (user = db.students.where({ user_private_info_id })[0]) {
    type = 'student';
  } else if (user = db.employees.where({ user_private_info_id })[0]) {
    type = 'employee';
  } else if (user = db.parents.where({ user_private_info_id })[0]) {
    type = 'parent';
  }
  return { user, type };
}

function loginWithUsernameAndPassword(db, data) {
  const username = decodeURIComponent(data.username);
  let user_id, user_type, school_id;
  if (validateEmail(username)) {
    const privateInfo = db.user_private_infos.where({ email: username })[0];
    const { user, type } = findUser(db, privateInfo && privateInfo.id);
    [user_id, user_type, school_id] = [(user && user.id), type, (user && user.school_id)];
  } else {
    const idMatching   = username.match(/_(\d+)$/);
    if (idMatching) {
      const typeMatching = username.match(/^(\w+)_\d+$/);
      user_id = idMatching ? idMatching[1] : defaultUserIdPerType[username];
      user_type = typeMatching ? typeMatching[1] : username;
      school_id = 1;
    } else {
      const privateInfo = db.user_private_infos.where({ username })[0];
      if (privateInfo) {
        const { user, type } = findUser(db, privateInfo.id);
        [user_id, user_type, school_id] = [user.id, type, user.school_id];
      }
    }
  }
  if (!user_id) {
    return new Response(401, {}, { errors: { identification: ['not_found'] } });
  } else if (data.password === 'bad_password') {
    return new Response(401, {}, { errors: { password: ['invalid'] } });
  }
  return {
    "access_token": "fed17b7da45b2ac3d9c8c823a36ebcbf3a1cd3e18f6cd703781c9bebfa830e03",
    "token_type": "bearer",
    "expires_in": 7200,
    "refresh_token": "b9c0099a18eb99238b6ad48f831d0499fcde1a68f59102af6d09562c77b6d30c",
    "created_at": 1425027308,
    user_id,
    user_type,
    school_id
  };
}

function loginWithPin(db, { pin }) {
  const pidWithoutLetter = pin.slice(1, pin.length);
  const { user, type } = findUser(db, parseInt(pidWithoutLetter, 10)); // Ignore trailing 0s, so 0091 will login you as user(id:91)
  if (user) {
    return {
      "access_token": "fed17b7da45b2ac3d9c8c823a36ebcbf3a1cd3e18f6cd703781c9bebfa830e03",
      "token_type": "bearer",
      "expires_in": 7200,
      "refresh_token": "b9c0099a18eb99238b6ad48f831d0499fcde1a68f59102af6d09562c77b6d30c",
      "created_at": 1425027308,
      user_id: user.id,
      user_type: type,
      school_id: user.school_id
    };
  } else {
    return new Response(401, {}, { errors: { pin: ['invalid'] } });
  }
}

function loginWith3rdPartyToken(db /*, data */) {
  // This fake API always logs in with a employee
  const user = db.employees.find(9991);
  return {
    "access_token": "fed17b7da45b2ac3d9c8c823a36ebcbf3a1cd3e18f6cd703781c9bebfa830e03",
    "token_type": "bearer",
    "expires_in": 7200,
    "refresh_token": "b9c0099a18eb99238b6ad48f831d0499fcde1a68f59102af6d09562c77b6d30c",
    "created_at": 1425027308,
    user_id: user.id,
    user_type: 'employee',
    school_id: user.school_id
  };
}

export default function() {
  this.timing = 0;

  this.post('login_letters', function() {
    return {
      "login_letter": {
        "url": "http://kmmc.in/wp-content/uploads/2014/01/lesson2.pdf",
        "id": 1,
        "user_id": 41
      }
    };
  });

  this.post('/oauth/token', function(db, req) {
    let data = parseQueryString(req.requestBody);
    if (data.grant_type === 'pin') {
      return loginWithPin(db, data);
    } else {
      return loginWithUsernameAndPassword(db, data);
    }
  });

  this.post('/oauth/facebook', function(db, req) {
    const data = parseQueryString(req.requestBody);
    return loginWith3rdPartyToken(db, data);
  });

  this.post('/oauth/google', function(db, req) {
    const data = parseQueryString(req.requestBody);
    return loginWith3rdPartyToken(db, data);
  });

  this.post('/signups', function(db, req) {
    const data = JSON.parse(req.requestBody);

    // Validations and error response
    const errors = {};
    if (isBlank(data.forename)) { errors.forename = ['blank']; }
    if (isBlank(data.surname)) { errors.surname = ['blank']; }
    if (isBlank(data.password)) { errors.password = ['blank']; }
    if (isBlank(data.school_id) && isBlank(data.school_name)) { errors.school_name = ['blank']; }
    if (isBlank(data.email)) {
      errors.email = ['blank'];
    } else if (!validateEmail(data.email)) {
      errors.email = ['invalid'];
    }
    if (Object.keys(errors).length > 0) {
      return new Response(422, {}, { errors });
    }

    // Create teacher & school
    const privInfo = db.user_private_infos.insert({ email: data.email, lastActivityAt: new Date() });
    const teacher  = db.employees.insert({
      title: data.title,
      employeeType: 'teacher',
      forename: data.forename,
      surname: data.surname,
      user_private_info_id: privInfo.id
    });
    let school;
    if (data.school_id) {
      school = db.schools.find(data.school_id);
    } else {
      school = db.schools.insert({ name: data.school_name, teacher_ids: [] });
    }
    teacher.school_id = school.id;
    school.teacher_ids.push(teacher.id);

    return new Response(204);
  });

  this.post('/reset_password', function(db, req) {
    const { email } = JSON.parse(req.requestBody);
    const privateInfo = db.user_private_infos.where({ email })[0];
    if (privateInfo) {
      return new Response(204);
    } else {
      return new Response(404, {}, { errors: { email: ['not_found'] } });
    }
  });

  this.post('/request_verification_code', function(db, req) {
    const { phone } = JSON.parse(req.requestBody);
    if (phone && phone !== '666666666') {
      return new Response(204);
    } else {
      // The phone of the beast shall not pass!!
      return new Response(404, {}, { errors: { phone: 'not_found' } });
    }
  });

  this.post('/send_verification_code', function(db, req) {
    const { code } = JSON.parse(req.requestBody);
    if (code && code !== 'bad_code') {
      return new Response(204);
    } else {
      // The code of the beast shall not pass!!
      return new Response(401, {}, { errors: { code: ['invalid'] } });
    }
  });

  this.post('/fill_details', function(db, req) {
    const data = JSON.parse(req.requestBody);
    if (data.password === data.password_confirmation) {
      return new Response(204);
    } else {
      return new Response(422, {}, { error: "Confirmation doesn't match" });
    }
  });

  this.get('/announcement_events', function(db, req){
    let params = req.queryParams;
    params.limit = (params.limit || 20);
    if(params.date !== undefined) {
      return { announcement_events: db.announcement_events.filterBy('event_on', params.date).slice(0, params.limit) };
    } else {
      return { announcement_events: db.announcement_events.slice(0, params.limit) };
    }
  });
  this.post('/announcement_events', function(db, req){
    let eventParams = JSON.parse(req.requestBody).announcement_event;
    if (!eventParams.title) {
      return new Response(422, { 'Content-Type' : 'text/json' } , { errors: { title: 'Cant be blank', send_to_type: 'Cant be blank', message: 'Cant be blank' } });
    }

    let event = db.announcement_events.insert(eventParams);

    return { announcement_event: event };
  });

  this.get('/announcement_events/:id');
  this.put('/announcement_events/:id');
  this.delete('/announcement_events/:id');

  this.get('/announcement_categories');
  this.put('/announcement_categories');
  this.delete('/announcement_categories');
  this.post('/announcement_categories', function(db, req) {
    let data = JSON.parse(req.requestBody).announcement_category;
    if (!data.name || data.name.length === 0) {
      return new Response(422, {}, { errors: {
          name: ['blank']
        }
      });
    }
    return { announcement_category: db.announcement_categories.insert(data) };
  });
  this.get('/announcement_categories/:id');
  this.put('/announcement_categories/:id');
  this.delete('/announcement_categories/:id');

  this.get('/personal_calendar_tasks');

  this.get('/homeworks', coalesceFilterSortAndPaginate('homeworks', { filterFields: ['title'], filterFn: filterPublishedAssignmentType }));
  this.get('/homeworks/:id');
  this.put('/homeworks/:id');
  this.post('/homeworks', function(db, req) {
    let hwParams = JSON.parse(req.requestBody).homework;
    if (!hwParams.title) {
      return new Response(422, { 'Content-Type' : 'text/json' } , { errors: { title: 'Cant be blank', dueOn: ['is wrong'] } });
    }

    let homework = db.homeworks.insert(hwParams);

    // /* Push ID to class group */
    // let classGroup = db.class_groups.filternd(homework.class_group_id);
    // classGroup.homework_ids.push(homework.id);

    return { homework: homework };
  });
  this.get('/homework_submissions', { coalesce: true });
  this.get('/homework_submissions/:id');
  this.put('/homework_submissions/:id', updateManualGradeableSubmission('homework_submission'));

  this.get('/submission_comments', { coalesce: true });
  this.get('/submission_comments/:id');
  this.put('/submission_comments/:id');
  this.post('/submission_comments', function(db, req){
    let newData = JSON.parse(req.requestBody).submission_comment;
    let submission = db.homework_submissions.find(newData.submission_id);
    let id = Math.round(Math.random() * 1000 + 10);

    let submission_comment = {
      id: id,
      text: newData.text,
      user_id: newData.user_id,
      submission_id: newData.submission_id,
      created_at: Date.now(),
      updated_at: Date.now()
    };

    submission.comment_ids.push(submission_comment.id);
    db.submission_comments.push(submission_comment);
    return { submission_comment: submission_comment };
  });

  this.post('/submission_versions', function(db, req){
    let newData = JSON.parse(req.requestBody).submission_version;
    let submission = db.homework_submissions.find(newData.submission_id);

    let attachment = {
      content_type: 'text/plain',
      crocodoc_uuid: null,
      file_size: 12,
      preview_url: 'http://www.google.com',
      file_url: 'http://www.google.com',
      filename: `file.pdf`,
      user: 1,
      created_at: '2015-09-11T00:00:00+00:00',
      updated_at: '2015-11-24T00:00:00+00:00'
    };

    let generatedAttachment = db.attachments.insert(attachment);

    let submission_version = {
      text: newData.text,
      user_id: newData.user_id,
      submission_id: newData.submission_id,
      attachment_ids: [generatedAttachment.id],
      created_at: Date.now(),
      updated_at: Date.now()
    };

    submission.version_ids.push(submission_version.id);
    db.submission_versions.insert(submission_version);
    return { submission_version: submission_version };
  });

  this.get('/submission_versions', { coalesce: true });
  this.get('/submission_versions/:id');

  this.get('/submission_events', { coalesce: true });
  this.get('/submission_events/:id');
  this.put('/submission_events/:id');
  this.post('/submission_events');

  this.get('/submissions', function(db, req) {
    const student_id = req.queryParams.student_id;
    const homework_submissions                = db.homework_submissions.where({ student_id });
    const quiz_submissions                    = db.quiz_submissions.where({ student_id });
    const differentiated_homework_submissions = db.differentiated_homework_submissions.where({ student_id });
    const class_test_submissions              = db.class_test_submissions.where({ student_id });
    let submissions = [].concat(homework_submissions, quiz_submissions, differentiated_homework_submissions, class_test_submissions);
    const unfilteredCount = submissions.length;
    submissions = filterSubmissions(submissions, db, req);
    const filteredCount = submissions.length;
    submissions = paginate(submissions, req);
    return submissions.reduce(function(memo, sub) {
      if (sub.homework_id) {
        memo.homework_submissions.push(sub);
      } else if (sub.differentiated_homework_id) {
        memo.differentiated_homework_submissions.push(sub);
      } else if (sub.class_test_id) {
        memo.class_test_submissions.push(sub);
      } else if (sub.spelling_test_id) {
        memo.spelling_test_submissions.push(sub);
      } else if (sub.quiz_id) {
        memo.quiz_submissions.push(sub);
      }
      return memo;
    }, {
      meta: { count: unfilteredCount, selection_count: filteredCount },
      homework_submissions: [],
      quiz_submissions: [],
      differentiated_homework_submissions: [],
      class_test_submissions: [],
      spelling_test_submissions: []
    });
  });

  this.get('/class_years');
  this.put('/class_years/:id');
  this.put('/class_years');
  this.del('/class_years/:id');
  this.get('/class_years/:id');
  this.post('/class_years', function(db, req) {
    let data = JSON.parse(req.requestBody).class_year;
    if (!data.name || data.name.length === 0) {
      return new Response(422, {}, { errors: {
          name: ['blank']
        }
      });
    }
    return { class_year: db.class_years.insert(data) };
  });

  this.get('/subjects', coalesceFilterSortAndPaginate('subject', { filterFields: ['name'] }));
  this.get('/subjects/:id');
  this.put('/subjects/:id');
  this.del('/subjects/:id');
  this.post('/subjects/merge', function(db, req) {
    let data = JSON.parse(req.requestBody);
    let originSubject = db.subjects.find(data.origin_subject_id);
    let newSubject = db.subjects.find(data.destination_subject_id);

    ['homeworks', 'class_tests', 'differentiated_homeworks', 'quizzes', 'spelling_tests'].forEach(function(collectionName) {
      let assignments = db[collectionName].where({subject: originSubject.name});
      assignments.forEach(function(assignment){
        assignment.subject = newSubject.name;
      });
    });

    return new Mirage.Response(204);
  });
  this.post('/subjects', function(db, req) {
    let data = JSON.parse(req.requestBody).subject;
    if (!data.name || data.name.length === 0) {
      return new Response(422, {}, { errors: {
          name: ['blank']
        }
      });
    }
    return { subject: db.subjects.insert(data) };
  });

  this.get('/class_groups', coalesceFilterSortAndPaginate('class-group', { filterFields: ['name'] }));
  this.post('/class_groups', function(db, req) {
    const params = JSON.parse(req.requestBody).class_group;
    if (params.name === 'invalid') {
      return new Response(422, {}, { errors: {
          name: ['blank'],
          class_year: ['blank'],
          student_ids: ['blank'],
          teacher_ids: ['blank'],
        }
      });
    } else {
      return { class_group: db.class_groups.insert(params) };
    }
  });
  this.get('/class_groups/:id');
  this.put('/class_groups/:id');
  this.delete('/class_groups/:id');

  this.get('/schools', coalesceFilterSortAndPaginate('school', { filterFields: ['name', 'address'] }));
  this.post('/schools');
  this.get('/schools/:id');
  this.del('/schools/:id');
  this.put('/schools/:id');

  this.get('/registration_groups');

  this.get('/school_private_infos');
  this.get('/school_private_infos/:id');

  this.get('/user_private_infos', function(db, req) {
    const originals = db.user_private_infos.find(req.queryParams.ids);
    const user_private_infos = JSON.parse(JSON.stringify(originals));
    user_private_infos.forEach(info => delete info.password);
    return { user_private_infos };
  });
  this.get('/user_private_infos/:id', function(db, req) {
    const original = db.user_private_infos.find(req.params.id);
    const user_private_info = JSON.parse(JSON.stringify(original));
    delete user_private_info.password;
    return { user_private_info };
  });

  this.get('/employees', coalesceFilterSortAndPaginate('employee', { filterFields: { filter: ['forename', 'surname'] } }));
  this.post('/employees', function(db, req){
    let data = JSON.parse(req.requestBody).employee;
    let employeePrivateInfo = db.user_private_infos.insert(data.user_private_info);
    delete data.user_private_info;
    data.user_private_info_id = employeePrivateInfo.id;
    if (!data.forename || data.forename.length === 0) {
      return new Response(422, {}, { errors: {
          forename: ['blank']
        }
      });
    }
    return { employee: db.employees.insert(data) };
  });

  this.get('/employees/:id');
  this.del('/employees/:id');
  this.put('/employees/:id', function(db, req){
    let employee = db.employees.find(req.params.id);
    let requestParams = JSON.parse(req.requestBody).employee;
    let usePrivateInfoId = employee.user_private_info_id;

    /* Update private info */
    let employeePrivateInfoParams = requestParams.user_private_info;
    delete employeePrivateInfoParams.id;
    db.user_private_infos.update(usePrivateInfoId, employeePrivateInfoParams);

    /* Update employee */
    delete requestParams.user_private_info;
    return {
      employee: db.employees.update(req.params.id, requestParams),
      user_private_infos: [db.user_private_infos.find(usePrivateInfoId)]
    };
  });

  this.get('/students', coalesceFilterSortAndPaginate('student', { filterFields: { filter: ['forename', 'surname'], school_id: 'school_id' } }));
  this.post('/students', function(db, req){
    let data = JSON.parse(req.requestBody).student;
    let studentPrivateInfo = db.user_private_infos.insert(data.user_private_info);
    delete data.user_private_info;
    data.user_private_info_id = studentPrivateInfo.id;
    if (!data.forename || data.forename.length === 0) {
      return new Response(422, {}, { errors: {
          forename: ['blank']
        }
      });
    }
    return {
      student: db.students.insert(data)
    };
  });
  this.get('/students/:id');
  this.del('/students/:id');
  this.put('/students/:id', function(db, req) {
    let student = db.students.find(req.params.id);
    let requestParams = JSON.parse(req.requestBody).student;
    let usePrivateInfoId = student.user_private_info_id;

    /* Update private info */
    let studentPrivateInfoParams = requestParams.user_private_info;
    delete studentPrivateInfoParams.id;
    db.user_private_infos.update(usePrivateInfoId, studentPrivateInfoParams);

    /* Update Student */
    delete requestParams.user_private_info;
    return {
      student: db.students.update(req.params.id, requestParams),
      user_private_infos: [db.user_private_infos.find(usePrivateInfoId)]
    };
  });

  this.get('/parents', coalesceFilterSortAndPaginate('parent', { filterFields: { filter: ['forename', 'surname'], school_id: 'school_id' } }));
  this.post('/parents', function(db, req){
    let data = JSON.parse(req.requestBody).parent;
    let parentPrivateInfo = db.user_private_infos.insert(data.user_private_info);
    delete data.user_private_info;
    data.user_private_info_id = parentPrivateInfo.id;
    if (!data.forename || data.forename.length === 0) {
      return new Response(422, {}, { errors: {
          forename: ['blank']
        }
      });
    }
    return { parent: db.parents.insert(data) };
  });
  this.get('/parents/:id');
  this.del('/parents/:id');
  this.put('/parents/:id');
  this.put('/parents/:id', function(db, req) {
    let parent = db.parents.find(req.params.id);
    let requestParams = JSON.parse(req.requestBody).parent;
    let usePrivateInfoId = parent.user_private_info_id;

    /* Update private info */
    let parentPrivateInfoParams = requestParams.user_private_info;
    delete parentPrivateInfoParams.id;
    db.user_private_infos.update(usePrivateInfoId, parentPrivateInfoParams);

    /* Update parent */
    delete requestParams.user_private_info;
    return {
      parent: db.parents.update(req.params.id, requestParams),
      user_private_infos: [db.user_private_infos.find(usePrivateInfoId)]
    };
  });

  this.get('/assignments', function(db, req) {
    const conditions = coalesceFilterSortAndPaginate_extractConditions(req);
    let published;
    if (conditions.hasOwnProperty('published')) {
      published = !!conditions.published;
      delete conditions.published;
    }
    const opts = { filterFields: ['title'] };
    const homeworks                = coalesceFilterSortAndPaginate_filter(db.homeworks, conditions, opts, db, req);
    const quizzes                  = coalesceFilterSortAndPaginate_filter(db.quizzes, conditions, opts, db, req);
    const differentiated_homeworks = coalesceFilterSortAndPaginate_filter(db.differentiated_homeworks, conditions, opts, db, req);
    const class_tests              = coalesceFilterSortAndPaginate_filter(db.class_tests, conditions, opts, db, req);
    const spelling_tests           = coalesceFilterSortAndPaginate_filter(db.spelling_tests, conditions, opts, db, req);
    let allTogether = [].concat(homeworks, quizzes, differentiated_homeworks, class_tests, spelling_tests);
    if (published === true) {
      allTogether = allTogether.filter(e => !!e.published_at);
    } else if (published === false) {
      allTogether = allTogether.filter(e => !e.published_at);
    } // else keep all records
    const selection_count = allTogether.length;

    let assignments = coalesceFilterSortAndPaginate_sort(allTogether, req);
    if (req.queryParams.limit) {
      assignments = coalesceFilterSortAndPaginate_paginate(assignments, req.queryParams.limit, req.queryParams.offset);
    }

    return assignments.reduce(function(memo, sub) {
      if (sub.__type === 'homework') {
        memo.homeworks.push(sub);
      } else if (sub.__type === 'differentiated_homework') {
        memo.differentiated_homeworks.push(sub);
      } else if (sub.__type === 'class_test') {
        memo.class_tests.push(sub);
      } else if (sub.__type === 'quiz') {
        memo.quizzes.push(sub);
      } else if (sub.__type === 'spelling_test') {
        memo.spelling_tests.push(sub);
      }
      return memo;
    }, {
      meta: { selection_count: selection_count },
      homeworks: [],
      quizzes: [],
      differentiated_homeworks: [],
      class_tests: [],
      spelling_tests: []
    });
  });

  this.get('/marking_schemes', coalesceFilterSortAndPaginate('marking_scheme', { filterFields: ['name'] }));
  this.put('/marking_schemes');
  this.del('/marking_schemes');
  this.post('/marking_schemes');
  this.get('/marking_schemes/:id');
  this.put('/marking_schemes/:id');
  this.del('/marking_schemes/:id');
  this.post('/marking_schemes', function(db, req) {
    let data = JSON.parse(req.requestBody).marking_scheme;
    if (!data.title || data.title.length === 0) {
      return new Response(422, {}, { errors: {
          title: ['blank']
        }
      });
    }
    return { marking_scheme: db.marking_schemes.insert(data) };
  });

  this.get('/heartbeat', function() {
    return {
      time: new Date().getTime()
    };
  });
}
