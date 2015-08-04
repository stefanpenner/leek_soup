import ManualGradeableSubmissionFactory from './manual_gradeable_submission';

export default ManualGradeableSubmissionFactory.extend({
  class_test_id: () => server.create('class_test').id
});
