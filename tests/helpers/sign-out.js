import Ember from 'ember';

export default Ember.Test.registerHelper('signOut', function(app) {
  let container = app.__container__;
  let session = container.lookup('simple-auth-session:main');
  Ember.run(function() {
    session.setProperties({ user_id: null, user_type: null, school_id: null });
  });
});
