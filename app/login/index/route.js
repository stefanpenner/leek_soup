import Ember from 'ember';

export default Ember.Route.extend({
  deactivate() {
    let controller = this.get('controller');
    controller.setProperties({
      identification: null,
      password: null
    });
  }
});
