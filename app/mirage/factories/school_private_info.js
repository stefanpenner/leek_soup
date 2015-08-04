import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  email(i) {
    return `user${i}@example.com`;
  },

  locale: 'en',
  marking_scheme_ids(){
    return [server.create('marking_scheme').id];
  },

});
