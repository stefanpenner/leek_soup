import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  user_private_info_id() {
    return server.create('user_private_info', { __type: this.__type }).id;
  },

  forename(i) {
    return 'Name' + i;
  },

  school_id() {
    return server.create('school').id;
  },

  surname(i) {
    return 'Surname' + i;
  },

  title: 'Mr',
  created_at: '2015-11-24T18:00:00+00:00',
  last_activity_at: '2015-02-26T10:21:09+00:00',
  mobile_beta_user: false
});
