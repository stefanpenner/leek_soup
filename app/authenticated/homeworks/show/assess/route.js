import Ember from 'ember';
import { CanMixin } from 'ember-can';
import { breadCrumbCP } from 'smhw-frontend/utils/custom-computed-properties';

export default Ember.Route.extend(CanMixin, {
  breadCrumb: breadCrumbCP('shared.assess'),

  afterModel() {
    return this.modelFor('authenticated.homeworks.show').get('markingScheme');
  },

  redirect(model, transition) {
    if (!this.can('see authenticated.homeworks.show.assess', model)) {
      transition.abort();
      if (transition.sequence === 0) {
        this.replaceWith('authenticated.index');
      }
    }
  }
});
