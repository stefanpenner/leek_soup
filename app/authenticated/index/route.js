import Ember from 'ember';

const defaultRouteNamesByType = {
  student: 'authenticated.todos',
  employee: 'authenticated.set-assignment',
  parent: 'authenticated.select-student'
};

export default Ember.Route.extend({
  redirect(_, transition) {
    const currentUser = this.get('currentUser');
    if (currentUser) {
      if (!currentUser.get('hasFilledDetails')) {
        this.replaceWith('login.details');
      }
      if (transition.targetName === 'authenticated.index') {
        this.replaceWith(defaultRouteNamesByType[this.get('session.secure.user_type')]);
      }
    }
  }
});
