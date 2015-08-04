import Ember from 'ember';
import DS from 'ember-data';
import validateEmail from 'smhw-frontend/utils/validate-email';
import { clearErrorsCP } from 'smhw-frontend/utils/custom-computed-properties';


const { singularize } = Ember.String;
const { computed } = Ember;

export default Ember.Controller.extend({
  init() {
    this.errors = DS.Errors.create();
  },

  // CPs
  email: clearErrorsCP(),
  emailInvalid: computed('email', function() {
    return !validateEmail(this.get('email'));
  }),
  buttonDisabled: computed.or('emailInvalid', 'onAir'),

  // Actions
  actions: {
    resetPassword(email) {
      const adapter = this.container.lookup('adapter:application');
      this.set('onAir', true);
      adapter.ajax(singularize(adapter.buildURL('reset_password')), 'POST', { data: { email } })
        .then(() => this.transitionToRoute('login'))
        .catch(req => {
          this.errors.clear();
          for (let key in req.responseJSON.errors) {
            this.errors.add(key, req.responseJSON.errors[key]);
          }
        })
        .finally(() => this.set('onAir', false));
    }
  }
});
