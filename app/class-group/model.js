import DS from 'ember-data';

export default DS.Model.extend({
  name:           DS.attr('string'),
  classYear:      DS.attr('string'),
  school:         DS.belongsTo('school', { async: true }),
  teachers:       DS.hasMany('employee', { async: true }),
  students:       DS.hasMany('student', { async: true })
});
