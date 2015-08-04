import DS from 'ember-data';
import WithAttachments from 'smhw-frontend/mixins/with-attachments';

export default DS.Model.extend(WithAttachments, {
  completeOnlineText: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  submission: DS.belongsTo('homework-submission', { async: true }),
  user: DS.belongsTo('user', { async: true }),

  componentString: 'submission-activity-feed-version'
});
