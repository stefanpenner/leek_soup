import Ember from 'ember';
import { CanMixin } from 'ember-can';
import { breadCrumbCP } from 'smhw-frontend/utils/custom-computed-properties';

export default Ember.Route.extend(CanMixin, {
  breadCrumb: breadCrumbCP('homeworks.headerTitle'),

  beforeModel(transition) {
    if (!this.can('create assignment in authenticated')) {
      transition.abort();
      if (transition.sequence === 0) {
        this.replaceWith('authenticated.index');
      }
    }
  },

  model() {
    let teacher  = this.get('currentUser');
    let school   = teacher.get('school');
    return this.store.createRecord('homework', { teacher, school });
  },

  deactivate() {
    const homework = this.modelFor(this.routeName);
    if (homework.get('isNew') && !homework.get('isSaving')) {
      homework.deleteRecord();
    }
  },

  actions: {
    saveRecord(assignment) {
      const publishedAt = assignment.get('publishedAt');
      assignment.set('publishedAt', publishedAt || new Date());
      this._saveAssingnment(assignment).catch(error => {
        assignment.set('publishedAt', publishedAt);
        console.log(error);
      });
    },

    saveAsDraft(assignment) {
      this._saveAssingnment(assignment).catch(console.log.bind(console));
    }
  },

  _saveAssingnment(assignment) {
    return assignment.save()
      .then(hw => this.transitionTo('authenticated.homeworks.show', hw));
  }
});
