import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  redirect(model, transition) {
    if (!this.can('see authenticated.homeworks.show.results', model)) {
      transition.abort();
      if (transition.sequence === 0) {
        this.replaceWith('authenticated.index');
      }
    }
  }
});
