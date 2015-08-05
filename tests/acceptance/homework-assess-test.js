import Ember from 'ember';
import DS from 'ember-data';
import { module, test } from 'qunit';
import startApp from 'smhw-frontend/tests/helpers/start-app';

var application, container, teacher;
function Bar() {}
var bar;
module('Acceptance | HomeworkAssess', {
  beforeEach: function() {
    bar = new Bar();
    application = startApp();
    teacher = server.create('employee');
    signIn({ user: teacher, type: 'employee' });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
    delete window.server;
  }
});

test('visiting /homeworks/1/assess renders page with no submissions', function(assert) {
  var homework = server.create('homework', { teacher_id: teacher.id });

  visit('/homeworks/' + homework.id + '/assess');
  andThen(function() {
    assert.equal(currentPath(), 'authenticated.homeworks.show.assess');
    assert.equal(find('p').text(), 'No submissions yet');
    assert.equal(find('h1').text(), homework.title);
  });
});

test('visiting /homeworks/1/assess renders page with submissions', function(assert) {
  var student = server.create('student');
  var homework = server.create('homework', { teacher_id: teacher.id });
  var submission = server.create('homework_submission', { id: `${homework.id}-${student.id}`, student_id: student.id, homework_id: homework.id });
  homework.submission_ids = [submission.id];

  visit('/homeworks/' + homework.id + '/assess');

  andThen(function() {
    assert.equal(currentPath(), 'authenticated.homeworks.show.assess');
    assert.equal(find('p.blurb-test').text(), 'Select a student below and update the status of their homework');
    assert.equal(find('h1').text(), homework.title);
  });
});

test('visiting /homeworks/1/assess should render submission', function(assert) {
  var student = server.create('student');
  var homework = server.create('homework', { teacher_id: teacher.id });
  var submission = server.create('homework_submission', { id: `${homework.id}-${student.id}`, student_id: student.id, homework_id: homework.id });
  homework.submission_ids = [submission.id];

  visit('/homeworks/' + homework.id + '/assess');
  andThen(function() {
    assert.equal(find('.submissions-list li').length, 1);
    assert.equal(find('.submissions-list li .submission-name').text(), student.forename + ' ' + student.surname);
    assert.equal(find('.submissions-list li .submission-grade').text().trim(), 'Unmarked');
  });
});

