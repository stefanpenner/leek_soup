import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  redirect(model, transition) {
    if (!this.can('see authenticated.homeworks.show.submit', model)) {
      transition.abort();
      if (transition.sequence === 0) {
        this.replaceWith('authenticated.index');
      }
    }
  },

  actions: {
    saveRecord(submissionVersion) {
      let homework = this.modelFor('authenticated.homeworks.show');
      submissionVersion.save().then(()=> this.transitionTo('authenticated.homeworks.show.results', homework));
    }
  },

  deactivate() {
    const submissionVersion = this.controller.get('submissionVersion');
    if (submissionVersion.get('isNew') && !submissionVersion.get('isSaving')) {
      submissionVersion.deleteRecord();
    }
  },

  setupController(controller) {
    this._super(...arguments);
    let user        = this.get('currentUser');
    let homework    = this.modelFor('authenticated.homeworks.show');
    let submission  = homework.get('submissions.firstObject');
    let version     = submission.get('versions').createRecord({ user });
    controller.set('submissionVersion', version);
  }
});
