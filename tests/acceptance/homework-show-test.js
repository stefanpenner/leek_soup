import Ember from 'ember';
import DS from 'ember-data';
import { module, test } from 'qunit';
import startApp from 'smhw-frontend/tests/helpers/start-app';

var application, container, teacher;

module('Acceptance | HomeworkShow', {
  beforeEach: function() {
    application = startApp();
    teacher = server.create('employee');
    signIn({ user: teacher, type: 'employee' });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /homeworks/1 renders page', function(assert) {
  var homework = server.create('homework', { teacher_id: teacher.id });

  visit('/homeworks/' + homework.id).then(function() {
    assert.equal(currentPath(), 'authenticated.homeworks.show.index');
    assert.equal(find('p.description').text(), homework.description);
    assert.equal(find('h1').text(), homework.title);
  });
});

test('visiting /homeworks/1 renders 2 tabs', function(assert) {
  var homework = server.create('homework', { teacher_id: teacher.id });

  visit('/homeworks/' + homework.id).then(function() {
    assert.equal(find('.tab-container ul li').length, 2);
  });
});
