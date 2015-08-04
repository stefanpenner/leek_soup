import Ember from 'ember';

export default Ember.Test.registerHelper('assertSelected', function(app, assert, selector, values) {
  assert.deepEqual(find(`${selector} .select2-container`).select2('val'), values);
});
