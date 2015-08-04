import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: i => i,
  active: false
});
