import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  active: DS.attr('boolean'),
  position: DS.attr('number'),

  school: DS.belongsTo('school', { async: true }),
  classGroups: DS.hasMany('class-group', { async: true }),
});
