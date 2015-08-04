import Ember from 'ember';
import ValidatedInputMixin from 'smhw-frontend/mixins/validated-input-mixin';

const { computed } = Ember;

export default Ember.Component.extend(ValidatedInputMixin, {
  classNames: ['smhw-validated-input'],
  classNameBindings: ['hasError', 'groupClasses', 'hasSuccess'],
  type: 'text',
  groupClasses: computed('attribute', function () {
    return [
      "form-group",
      Ember.String.dasherize(this.get('attribute') || "")
    ].compact().join(' ');
  }),

  inputClasses: computed('attributeClass', 'inputClass', function () {
    return ["form-control", this.get('inputClass'), this.get('attributeClass')].compact().join(' ');
  })
});
