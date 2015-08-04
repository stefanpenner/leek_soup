import Ember from 'ember';
import DS from 'ember-data';
import validatePin, { pinLooksValidSoFar } from 'smhw-frontend/utils/validate-pin';

const { computed } = Ember;

export default Ember.Controller.extend({
  init() {
    this.errors = DS.Errors.create();
  },

  // CPs
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

  pinInvalid: computed('pin', function() {
    return !validatePin(this.get('pin'));
  }),

  buttonDisabled: computed.or('pinInvalid', 'onAir'),

  // Actions
  actions: {
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
    }
  }
});
