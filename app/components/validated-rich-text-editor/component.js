import Ember from 'ember';
import ValidatedInputMixin from 'smhw-frontend/mixins/validated-input-mixin';

export default Ember.Component.extend(ValidatedInputMixin, {
  classNames: ['validated-text-editor'],
  classNameBindings: ['hasError']
});
