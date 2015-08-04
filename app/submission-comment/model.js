import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  user: DS.belongsTo('user', { async: true }),
  submission: DS.belongsTo('homework-submission', { async: true }),
  componentString: 'submission-activity-feed-comment'
});
