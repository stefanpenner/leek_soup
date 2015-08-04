import Ember from 'ember';
import BaseAuthenticator from 'simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  authenticate(sessionAttrs) {
    // unlike other auths, this one does not need to happen async
    // since the session attributes are a part of the index.html server by the server
    return new Ember.RSVP.Promise(function(resolve) {
      return resolve(sessionAttrs);
    });
  },
});