import Ember from 'ember';

export default Ember.Test.registerHelper('signIn', function(app, { user, type }) {
  authenticateSession().then(() => {
    const session = currentSession();
    session.setProperties({
      'secure.user_id': user.id,
      'secure.user_type': type,
      'secure.school_id': user.school_id
    });
  });
});
