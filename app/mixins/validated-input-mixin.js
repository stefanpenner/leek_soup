import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({
  i18n: Ember.inject.service(),
  errors: computed('model.errors.[]', 'attribute', {
    get() {
      return this.get(`model.errors.${this.get('attribute')}`);
    },
    set(key, errors) {
      return errors;
    }
  }),
  hasError: Ember.computed.gt('errors.length', 0),
  translatedLabelText: computed('labelText', function() {
    return this.get('i18n').t(this.get('labelText'));
  })
});
