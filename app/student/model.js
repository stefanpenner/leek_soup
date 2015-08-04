import DS from 'ember-data';
import User from 'smhw-frontend/user/model';

export default User.extend({
  recoverPin:       DS.attr('string'),
  regGroup:         DS.attr('string'),
  yearGroup:        DS.attr('string'),

  // Relations
  parents:          DS.hasMany('parent', { async: true }),
  isStudent: true
});
