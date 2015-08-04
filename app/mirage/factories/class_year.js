import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  id: i => i,
  name: "1",
  active: false,
  position: 1,
  class_group_ids: [1,2,3]
});