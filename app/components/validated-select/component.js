import Ember from 'ember';
import ValidatedinputMixin from 'smhw-frontend/mixins/validated-input-mixin';

const { computed } = Ember;

export default Ember.Component.extend(ValidatedinputMixin, {
  classNames: ['smhw-validated-select', 'form-group'],
  classNameBindings: ['hasError'],
  searchEnabled: true,
  value: computed({
    get() {
      return this.get('model.' + this.get('attribute'));
    },
    set(_key, value) {
      let attributeValue = this.get('optionValuePath').split('.')[1];

      if (value && value.get && attributeValue) {
        let realValue = value.get(attributeValue);
        this.get('model').set(this.get('attribute'), realValue);
      } else {
        this.set('model.' + this.get('attribute'), value);
      }
      return value;
    }
  })
});
