import Ember from 'ember';
import OAuth2Authenticator from 'simple-auth-oauth2/authenticators/oauth2';

// This class inherits from the OAUTH authenticator and customizes the `authenticate` method
// to send the PIN instead of the username/password.
export default OAuth2Authenticator.extend({
  authenticate: function(options) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      // This line is the only one that is different
      var data = { grant_type: 'pin', pin: options.pin };

      if (!Ember.isEmpty(options.scope)) {
        var scopesString = Ember.makeArray(options.scope).join(' ');
        Ember.merge(data, { scope: scopesString });
      }
      _this.makeRequest(_this.serverTokenEndpoint, data).then(function(response) {
        Ember.run(function() {
          var expiresAt = _this.absolutizeExpirationTime(response.expires_in);
          _this.scheduleAccessTokenRefresh(response.expires_in, expiresAt, response.refresh_token);
          if (!Ember.isEmpty(expiresAt)) {
            response = Ember.merge(response, { expires_at: expiresAt });
          }
          resolve(response);
        });
      }, function(xhr /*, status, error*/) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  }
});
