import DS from 'ember-data';
import User from 'smhw-frontend/user/model';

export default User.extend({
  isParent: true,
  recoverPin:       DS.attr('string'),
  // Relations
  students: DS.hasMany('student', { async: true }),
});
