import Ember from 'ember';
import DS from 'ember-data';
import { clearErrorsCP } from 'smhw-frontend/utils/custom-computed-properties';
const { singularize } = Ember.String;
const { computed } = Ember;
const expectedLength = 8;

export default Ember.Controller.extend({
  init() {
    this.errors = DS.Errors.create();
  },

  // CPs
  code: clearErrorsCP(),
  verificationCodeInvalid: computed('code', function() {
    const code = this.get('code');
    return !code || code.length !== expectedLength;
  }),
  buttonDisabled: computed.or('verificationCodeInvalid', 'onAir'),

  actions: {
    submitVerificationCode(code) {
      const adapter = this.container.lookup('adapter:application');
      this.set('onAir', true);
      adapter.ajax(singularize(adapter.buildURL('send_verification_code')), 'POST', { data: { code } })
        .then(() => this.transitionToRoute('login.pin.sent'))
        .catch(req => {
          this.errors.clear();
          for (let key in req.errors) { this.errors.add(key, req.errors[key]); }
        }).finally(() => this.set('onAir', false));
    }
  }
});
