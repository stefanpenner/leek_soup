import Ember from 'ember';
import { assignmentRouteName } from "smhw-frontend/helpers/assignment-route-name";

export default Ember.Route.extend({
  beforeModel() {
    const currentUser = this.get('currentUser');
    if (!this.session.isAuthenticated) {
      this.replaceWith('login');
    } else if (!currentUser.get('hasFilledDetails')){
      this.replaceWith('login.details');
    }
  },

  actions: {
    transitionToTask(task) {
      this.transitionTo(assignmentRouteName([task]), task.get('id'));
    },

    setStudent(student) {
      let controller = this.controllerFor(this.routeName);
      controller.set('parentActiveStudent', student);
    },

    clearStudent() {
      let controller = this.controllerFor(this.routeName);
      controller.set('parentActiveStudent', null);
    }
  }
});
