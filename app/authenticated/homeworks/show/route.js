import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let id = params.homework_slug.split('-')[0];
    return this.store.find('homework', id);
  },

  serialize(model) {
    return { homework_slug: model.get('slug') };
  },

  canSubmit: Ember.computed('model.handInOnline', function(){
    return this.get('model.handInOnline') && this.can('see authenticated.homeworks.show.submit');
  }),

  afterModel(model) {
    let breadCrumb = {
      title: model.get('title')
    };

    this.set('breadCrumb', breadCrumb);
  }
});
