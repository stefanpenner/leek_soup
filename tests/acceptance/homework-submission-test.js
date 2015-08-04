import Ember from 'ember';
import DS from 'ember-data';
import { module, test } from 'qunit';
import startApp from 'smhw-frontend/tests/helpers/start-app';

var application, container, student;

module('Acceptance | HomeworkSubmission', {
  beforeEach: function() {
    application = startApp();
    student = server.create('student');
    signIn({ user: student, type: 'student' });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /homeworks/1/submit renders page', function(assert) {
  var teacher = server.create('employee');
  var submission = server.create('homework_submission', { id: "1-" + student.id, student_id: student.id });
  var homework = server.create('homework', { teacher_id: teacher.id, hand_in_online: true, submission_ids: [submission.id] });

  visit('/homeworks/' + homework.id + '/submit');

  andThen(function() {
    assert.equal(currentPath(), 'authenticated.homeworks.show.submit');
    assert.equal(find('p strong').text(), 'Online homework submission');
    assert.equal(find(`ol > li > a:contains(${homework.title})`).text().trim(), homework.title);
  });
});
