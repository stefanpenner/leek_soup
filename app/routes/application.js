import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.session.isAuthenticated) {
      return this._populateUserAndSchoolServices();
    }

    return this._populateSchoolFromSubdomain();
  },

  actions: {
    sessionAuthenticationSucceeded() {
      this._populateUserAndSchoolServices()
        .then(([user]) => this.transitionTo(user.get('hasFilledDetails') ? 'authenticated' : 'login.details'));
    },

    updateQueryParams(queryParams) {
      this.transitionTo({ queryParams });
    },

    invalidateSession() {
      this.session.invalidate()
        .then(() => this.transitionTo('login'))
        .catch(console.log.bind(console));
    }
  },

  // Methods
  _populateUserAndSchoolServices() {
    const { user_id, user_type, school_id } = this.get('session.secure');
    return Ember.RSVP.all([
      this.store.find(user_type, user_id).then(u => u.get('userPrivateInfo').then(() => u)),
      this.store.find('school', school_id)
    ]).then(([user, school]) => {
      this.get('currentUser').set('content', user);
      this.get('currentSchool').set('content', school);
      return [user, school];
    });
  },

  _populateSchoolFromSubdomain() {
    let subdomain = this.get('urlChecker.subdomain');

    if(subdomain !== 'default') {
      return this.store.query('school', {subdomain: subdomain}).then((schools) => {
        let school = schools.get('firstObject');
        this.get('currentSchool').set('content', school);
      });
    }
  }
});
