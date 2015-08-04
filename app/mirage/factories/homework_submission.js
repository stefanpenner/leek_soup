import ManualGradeableSubmissionFactory from './manual_gradeable_submission';

export default ManualGradeableSubmissionFactory.extend({
  homework_id: () => server.create('homework').id
});
