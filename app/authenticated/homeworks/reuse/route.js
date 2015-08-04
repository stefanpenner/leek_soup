import Ember from 'ember';
import { CanMixin } from 'ember-can';

const reusableAttibutes = ['title', 'subject', 'description', 'purpose', 'classGroup',
  'markingScheme', 'webLinks', 'duration', 'durationUnits'];

export default Ember.Route.extend(CanMixin, {
  beforeModel(transition) {
    if (!this.can('create assignment in authenticated')) {
      transition.abort();
      if (transition.sequence === 0) {
        this.replaceWith('authenticated.index');
      }
    }
  },

  model(params) {
    let id = params.homework_slug.split('-')[0];
    return this.store.find('homework', id);
  },

  setupController(controller, model) {
    const attrs = model.getProperties(reusableAttibutes);
    attrs.teacher = this.get('currentUser');
    attrs.school  = attrs.teacher.get('school');
    attrs.isReuse = true;
    this._super(controller, this.store.createRecord('homework', attrs));
  },

  serialize(model) {
    return { homework_slug: model.get('slug') };
  },

  deactivate() {
    const homework = this.controller.get('model');
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

  _saveAssingnment(assignment){
    return assignment.save()
      .then(hw => this.transitionTo('authenticated.homeworks.show', hw));
  }
});
