import Ember from 'ember';

export default Ember.Test.registerHelper('assertBasicHomeworkFieldsPresent', function (app, {assert}) {
  assert.ok(find('.homework-title').length, 'prompts for a title');
  assert.ok(find('.validated-text-editor').length, 'prompts for a description');
  assert.ok(find('.homework-subject').length, 'prompts for a subject');
  assert.ok(find('.homework-class-group').length, 'prompts for a class-group');
  assert.ok(find('.homework-issued-on').length, 'prompts for a issued-on');
  assert.ok(find('.homework-due-on').length, 'prompts for a due-on');
});
