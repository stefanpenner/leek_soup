import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  global:             DS.attr('boolean'),
  active:             DS.attr('boolean'),
  name:               DS.attr('string'),
  title:               DS.attr('string'),
  grades:             DS.attr('string'),
  scholPrivateInfo:   DS.belongsTo('school-private-info', { async: true }),
  gradesList: Ember.computed('grades', function() {
    const grades = this.get('grades');
    if (grades) {
      let firstGrades = grades.split(',').splice(0, 2);
      let lastGrades = grades.split(',').splice( -2, 2);

      if (grades.length > 50){
        return `${firstGrades} ... ${lastGrades}`;
      } else {
        return grades;
      }
    }
  })
});
