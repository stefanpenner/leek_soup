import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  deserialize: function(value) {
    return value ? new Date(Date.parse(value)) : null;
  },

  serialize: function(value) {
    return value ? moment.utc(value).utcOffset(12).format() : null;
  }
});
