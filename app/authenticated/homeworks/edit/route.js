import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  init() {
    this._super(...arguments);
    this.removedAttachments = [];
  },

  redirect(model, transition) {
    if (!this.can('edit this homework in authenticated', model)) {
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

  serialize(model) {
    return { homework_slug: model.get('slug') };
  },

  deactivate() {
    const homework = this.modelFor(this.routeName);
    const attachments = homework.get('attachments');
    homework.rollbackAttributes();
    attachments.addObjects(this.removedAttachments);
    this.removedAttachments = [];
  },

  actions: {
    saveRecord(assignment) {
      const publishedAt = assignment.get('publishedAt');
      assignment.set('publishedAt', publishedAt || new Date());
      this._saveAssingnment(assignment)
        .catch(error => {
          assignment.set('publishedAt', publishedAt);
          console.log(error);
        });
    },

    saveAsDraft(assignment) {
      this._saveAssingnment(assignment).catch(console.log.bind(console));
    },

    deleteAttachment(attachment) {
      this.controller.model.get('attachments').removeObject(attachment);
      this.removedAttachments.push(attachment);
    }
  },

  _saveAssingnment(assignment){
    return assignment.save()
      .then(hw => {
        this._unloadRemovedAttachments();
        return hw;
      })
      .then(hw => this.transitionTo('authenticated.homeworks.show', hw));
  },

  _unloadRemovedAttachments() {
    this.removedAttachments.forEach(a => a.unloadRecord());
    this.removedAttachments = [];
  }
});
