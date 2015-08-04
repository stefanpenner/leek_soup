import Ember from 'ember';
import ValidatedinputMixin from 'smhw-frontend/mixins/validated-input-mixin';

export default Ember.Component.extend(ValidatedinputMixin, {
  // Attrs
  classNames: ['validated-multiple-select'],
  classNameBindings: ['hasError'],
  multiple: 'multiple',

  // Events
  change() {
    const errors = this.get('model.errors');
    const attribute = this.get('attribute');
    errors.remove(attribute);
  }
});
