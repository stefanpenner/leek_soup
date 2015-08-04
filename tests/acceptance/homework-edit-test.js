import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'smhw-frontend/tests/helpers/start-app';

var application, teacher, homework, editPath, homeworkTitle, classGroup1, classGroup2;

module('Acceptance | Homework edit', {
  beforeEach: function() {
    application = startApp();
    classGroup1 = server.create('class_group', { name: '01B' });
    classGroup2 = server.create('class_group', { name: '01C' });
    teacher = server.create('employee', { class_group_ids: [classGroup1.id, classGroup2.id] });
    homework = server.create('homework', { teacher_id: teacher.id });
    server.create('class_group', { name: '01B' });
    editPath = `/homeworks/${homework.id}/edit`;
    signIn({ user: teacher, type: 'employee' });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Editing a homework', function(assert) {
  visit(editPath);
  const newTitle = 'foobar';
  andThen(() => {
    assert.equal(currentURL(), editPath, 'renders');
    assert.equal(find('.homework-title').val().trim(), homework.title, 'Duplicates the values of the homework');

    fillIn('.homework-title', newTitle);
    click('.submit-homework');

    andThen(() => {
      assert.equal(find('h1').text().trim(), newTitle, 'creates a homework with the new attrs');
    });
  });
});

test('Cannot assign multiple groups', function(assert) {
  visit(editPath);
  andThen(() => {
    pickSelectOption({ selector: '.homework-class-group', option: ['01B', '01C'] });
  });

  andThen(() => {
    assertSelected(assert, '.homework-class-group', classGroup2.id.toString());
  });
});
