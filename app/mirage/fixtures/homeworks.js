import moment from 'moment';

export default [
  {
    id: 1,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: 'lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum',
    due_on: moment().subtract(2, 'days'),
    issued_on:  moment().subtract(4, 'days'),
    published_at: '2015-04-04T00:00:00+00:00',
    submission_type: 'online_submission',
    marking_scheme_id: 1,
    subject: 'English',
    duration_units: "hours",
    duration: 35,
    teacher_id: 9991,
    attachment_ids: [1, 2],
    webLinks: [],
    submission_ids: ["1-991", "1-992", "1-993"],
    title: 'Words are fun',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5',
    submissionType: 1
  }, {
    id: 2,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: 'Solve the next ecuations',
    due_on: moment().subtract(1, 'day'),
    issued_on: moment().subtract(3, 'days'),
    published_at: '2015-09-12T00:00:00+00:00',
    submission_type: 'online_submission',
    marking_scheme_id: 1,
    subject: 'Maths',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9992,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["2-991", "2-992", "2-993"],
    title: 'Numbers are fun',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  }, {
    id: 3,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: 'Name the capitals cities of the next contries',
    due_on: moment(),
    issued_on: moment().subtract(2, 'days'),
    published_at: '2015-09-13T00:00:00+00:00',
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: 'Geography',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9994,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["3-991", "3-992", "3-993"],
    title: 'Geography is fun',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  }, {
    id: 4,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: 'Select the bigger country among the options',
    due_on: moment().add(1, 'day'),
    issued_on: moment().subtract(1, 'days'),
    published_at: '2015-09-14T00:00:00+00:00',
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: 'Geography',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9993,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["4-991", "4-992", "4-993"],
    title: 'Which country is bigger?',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  }, {
    id: 5,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: 'Calculate the impact speed of the failing rock',
    due_on: moment().add(1, 'days'),
    issued_on: moment(),
    published_at: '2015-09-14T00:00:00+00:00',
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: 'Science',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9993,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["5-991", "5-992", "5-993"],
    title: 'Gravity problems',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  }, {
    id: 6,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: 'Something',
    due_on: moment().add(1, 'days').add(10, 'minutes'),
    issued_on: '2015-09-12T00:00:00+00:00',
    published_at: '2015-09-14T00:00:00+00:00',
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: 'Science',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9993,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["6-991", "6-992", "6-993"],
    title: 'Exothermic reactions',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  }, {
    id: 7,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: '1500+ words essay about Shakespeare\s sexuality',
    due_on: moment().add(2, 'days'),
    issued_on: '2015-09-12T00:00:00+00:00',
    published_at: '2015-09-14T00:00:00+00:00',
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: 'English',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9991,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["7-991", "7-992", "7-993"],
    title: 'Shakespeare: Truth or mith',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  }, {
    id: 8,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: '1500+ words essay about Shakespeare\s sexuality',
    due_on: moment().add(3, 'days'),
    issued_on: '2015-09-12T00:00:00+00:00',
    published_at: '2015-09-14T00:00:00+00:00',
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: 'English',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9991,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["8-991", "8-992", "8-993"],
    title: 'Don Quixote and the golden century',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  }, {
    id: 9,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: '1500+ words essay about Shakespeare\s sexuality',
    due_on: moment().add(4, 'days'),
    issued_on: '2015-09-12T00:00:00+00:00',
    published_at: '2015-09-14T00:00:00+00:00',
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: 'Science',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9991,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["9-991", "9-992", "9-993"],
    title: 'The nervous system',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  },
  {
    id: 10,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: '1500+ words essay about Shakespeare\s sexuality',
    due_on: moment().add(5, 'days'),
    issued_on: '2015-09-12T00:00:00+00:00',
    published_at: null,
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: null,
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9991,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["10-991", "10-992", "10-993"],
    title: 'The conquer of America',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: null
  },
  {
    id: 11,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: '1500+ words essay about Shakespeare\s sexuality',
    due_on: moment().add(5, 'days'),
    issued_on: '2015-09-12T00:00:00+00:00',
    published_at: null,
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: 'History',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9991,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["10-991", "10-992", "10-993"],
    title: null,
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  },
  {
    id: 12,
    __type: 'homework', // Just to simulate STI, frontend should not receive this
    class_group_id: 1,
    school_id: 1,
    created_at: '2015-11-24T00:00:00+00:00',
    description: '1500+ words essay about Shakespeare\s sexuality',
    due_on: moment().add(5, 'days'),
    issued_on: '2015-09-12T00:00:00+00:00',
    published_at: null,
    submission_type: "class_submission",
    marking_scheme_id: 1,
    subject: 'History',
    duration_units: "minutes",
    duration: 30,
    teacher_id: 9991,
    attachment_ids: [],
    webLinks: [
      { url: 'http://wikipedia.com', thumbUrl: 'http://www.roboticspot.com/imagenes/robots/bender.jpgbig.jpg' },
      { url: 'http://google.com',    thumbUrl: 'http://www.unpopularscience.co.uk/wp-content/uploads/2013/05/Professor-Farnsworth.png' }
    ],
    submission_ids: ["10-991", "10-992", "10-993"],
    title: 'The conquer of America part II',
    updated_at: '2015-11-24T00:00:00+00:00',
    class_year: '5'
  }
];
