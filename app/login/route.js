import Ember from 'ember';

export default Ember.Route.extend({
  redirect(_, transition) {
    if (this.session.get('isAuthenticated')) {
      if (!this.get('currentUser.hasFilledDetails')) {
        return this.replaceWith('login.details');
      }
      this.replaceWith('authenticated');
    } else if (transition.targetName === 'login.details') {
      this.replaceWith('login');
    }
  }
});
