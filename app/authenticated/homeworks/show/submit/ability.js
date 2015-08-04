import { Ability } from 'ember-can';
import Ember from 'ember';

const { computed } = Ember;

export default Ability.extend({
  currentUser: Ember.inject.service('current-user'),

  canSee: computed('currentUser', function() {
    let currentUserType = this.get('currentUser.type');
    if (!currentUserType) { return false; }
    return ['student'].some(type => type === currentUserType) && this.get('model.submissions.length') > 0;
  })
});
