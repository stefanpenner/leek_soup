import DS from 'ember-data';
import HomeworkAttributesMixin from 'smhw-frontend/mixins/homework-attributes-mixin';
import WithAttachments from 'smhw-frontend/mixins/with-attachments';
import HomeworkSubmissionTypesMixin from 'smhw-frontend/mixins/homework-submission-types';

export default DS.Model.extend(HomeworkAttributesMixin, WithAttachments, HomeworkSubmissionTypesMixin, {
  durationUnits:  DS.attr('string'),
  duration:       DS.attr('string'),
  submissions:    DS.hasMany('homework-submission', { async: true }),
});

