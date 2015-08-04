import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  username(i) {
    return this.__type + i;
  },

  email(i) {
    return `${this.__type}${i}@example.com`;
  },

  uniqueId: 12345,

  bio: 'I lived and did stuff',
  last_activity_at: '2015-01-01T10:21:09+00:00'
});
