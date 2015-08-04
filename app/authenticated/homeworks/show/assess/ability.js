import { Ability } from 'ember-can';
import Ember from 'ember';

const { computed } = Ember;

export default Ability.extend({
  currentUser: Ember.inject.service('current-user'),

  canSee: computed('model', 'currentUser', function() {
    let currentUserType = this.get('currentUser.type');
    if (!currentUserType) { return false; }
    return this.get('model.teacher.id') === this.get('currentUser.id');
  })
});
