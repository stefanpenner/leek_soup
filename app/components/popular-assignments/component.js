import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  store: inject.service(),
  classNames: ['popular-assignments-container'],

  assignments: computed('model', function() {
    const options = { limit: this.get('limit'), sort: '-created_at', published: true };
    return this.get('store').findQuery(this.get('type'), options);
  })
});
