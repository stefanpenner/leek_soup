import Ember from 'ember';
import validateEmail from 'smhw-frontend/utils/validate-email';

const { computed, isPresent } = Ember;
const minUsernameLength = 3;

export default Ember.Controller.extend({
  confimationInvalid: computed('password', 'passwordConfirmation', function() {
    const { password, passwordConfirmation } = this.getProperties('password', 'passwordConfirmation');
    return isPresent(password) && isPresent(passwordConfirmation) && passwordConfirmation !== password;
  }),

  emailInvalid: computed('useUsername', 'identifier', function() {
    return !this.get('useUsername') && !validateEmail(this.get('identifier'));
  }),

  usernamelInvalid: computed('useUsername', 'identifier', function() {
    return this.get('useUsername') && this.get('identifier.length') < minUsernameLength;
  }),

  dataInvalid: computed.or('confimationInvalid', 'emailInvalid', 'usernameInvalid'),

  actions: {
    submit() {
      const data = {
        password: this.get('password'),
        password_confirmation: this.get('passwordConfirmation'),
        [this.get('useUsername') ? 'username' : 'email']: this.get('identifier')
      };
      const adapter = this.container.lookup('adapter:application');
      adapter.ajax(adapter.buildURL('fill_details'), 'POST', { data })
        .then(() => {
          this.get('currentUser').set('lastActivityAt', new Date());
          this.transitionToRoute('authenticated');
        })
        .catch(console.log.bind(console));
    }
  }
});
