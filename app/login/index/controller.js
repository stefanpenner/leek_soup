import Ember from 'ember';
import DS from 'ember-data';
import validatePin, { pinLooksValidSoFar } from 'smhw-frontend/utils/validate-pin';
import { clearErrorsCP } from 'smhw-frontend/utils/custom-computed-properties';
import config from 'smhw-frontend/config/environment';

const { computed, isBlank, setProperties } = Ember;

export default Ember.Controller.extend({
  init() {
    this.errors = DS.Errors.create();
  },

  // CPs
  identification: clearErrorsCP(),
  password: clearErrorsCP(),
  pin: computed({
    get() { return; },
    set(key, pin) {
      if (!pinLooksValidSoFar(pin)) {
        this.get('errors').add(key, 'bad_format');
      } else {
        this.get('errors').remove(key);
      }
      return pin;
    }
  }),

  identityInvalid: computed('identification', 'password', 'errors.[]', function() {
    const { identification, password, errors } = this.getProperties('identification', 'password', 'errors');
    return isBlank(identification) ||
      isBlank(password) ||
      errors.errorsFor('identification').length > 0 ||
      errors.errorsFor('password').length > 0;
  }),

  pinInvalid: computed('pin', function() {
    return !validatePin(this.get('pin'));
  }),

  identityFormDisabled: computed.or('identityInvalid', 'onAir'),
  pinFormDisabled: computed.or('pinInvalid', 'onAir'),

  // Actions
  actions: {
    authenticate(identification, password) {
      this.set('onAir', true);
      this.get('session').authenticate('simple-auth-authenticator:oauth2-password-grant', { identification, password })
        .then(() => this.send('sessionAuthenticationSucceeded'))
        .catch(({ errors }) => {
          this.errors.clear();
          for (let key in errors) {
            this.errors.add(key, errors[key]);
          }
        })
        .finally(() => this.set('onAir', false));
    },

    authenticateWithPin(pin) {
      this.set('onAir', true);
      this.get('session').authenticate('authenticator:pin', { pin })
        .then(() => this.send('sessionAuthenticationSucceeded'))
        .catch(({ errors }) => {
          this.errors.clear();
          for (let key in errors) {
            this.errors.add(key, errors[key]);
          }
        })
        .finally(() => this.set('onAir', false));
    },

    authenticateWithOauth2(providerName) {
      this.get('session').authenticate('simple-auth-authenticator:torii', providerName)
        .then(() => this._getSessionWith3rdPartyToken())
        .then(() => this.send('sessionAuthenticationSucceeded'))
        .catch(console.log.bind(console));
    }
  },

  // Methods
  _getSessionWith3rdPartyToken() {
    const adapter = this.container.lookup('adapter:application');
    const { provider, authorizationCode, redirectUri } = this.get('session.secure');
    const apiKey = config.torii.providers[provider].apiKey;
    const data = `grant_type=${encodeURIComponent(provider)}&code=${encodeURIComponent(authorizationCode)}&application_uid=${encodeURIComponent(apiKey)}`;
    return adapter.ajax(new URL(redirectUri).pathname, 'POST', { data })
      .then(data => setProperties(this.session.get('secure'), data))  ;
  }
});
