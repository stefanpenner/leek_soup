import Ember from 'ember';
import DS from 'ember-data';
import { clearErrorsCP } from 'smhw-frontend/utils/custom-computed-properties';
import validatePhone from 'smhw-frontend/utils/validate-phone';

const { singularize } = Ember.String;
const { computed } = Ember;

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.errors = DS.Errors.create();
  },
  // CPs
  buttonDisabled: computed.or('phoneInvalid', 'onAir'),
  phone: clearErrorsCP(),
  phoneInvalid: computed('phone', function() {
    return !validatePhone(this.get('phone'));
  }),

  // Actions
  actions: {
    requestVerificationCode(phone) {
      const adapter = this.container.lookup('adapter:application');
      this.set('onAir', true);
      adapter.ajax(singularize(adapter.buildURL('request_verification_code')), 'POST', { data: { phone } })
        .then(() => this.transitionToRoute('login.verify'))
        .catch(({ errors }) => {
          this.errors.clear();
          for (let key in errors) { this.errors.add(key, errors[key]); }
        })
        .finally(() => this.set('onAir', false));
    }
  }
});
