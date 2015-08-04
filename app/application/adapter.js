import ActiveModelAdapter from 'active-model-adapter';
import Ember from 'ember';
import config from 'smhw-frontend/config/environment';

export default ActiveModelAdapter.extend({
  coalesceFindRequests: true,
  namespace: config.APInamespace,
  host: config.APIhost,
  headers: Ember.computed('session.isAuthenticated', function() {
    return {
      "Authorization": 'Bearer:' + this.get('session.secure.smhw_token'),
      "Accept": "application/smhw.v3+json"
    };
  }),

  shouldBackgroundReloadRecord() {
    return false;
  }
});
