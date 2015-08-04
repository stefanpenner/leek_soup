import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({
  gradingComment: DS.attr('string', { defaultValue: null }),
  grade: DS.attr('string'),
  completed: DS.attr('boolean'),
  overdue: DS.attr('boolean'),
  marked: DS.attr('boolean'),
  handedInOn: DS.attr('date'),
  gradeSent: DS.attr('boolean'),
  status: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relations
  student: DS.belongsTo('student', { async: true }),
  comments: DS.hasMany('submission-comment', { async: true }),
  events: DS.hasMany('submission-event', { async: true }),
  versions: DS.hasMany('submission-version', { async: true }),

  // Aliases
  title: computed.alias('assignment.title'),
  subject: computed.alias('assignment.subject'),
  teacher: computed.alias('assignment.teacher'),
  dueOn: computed.alias('assignment.dueOn'),
  manualGrading: true
});
