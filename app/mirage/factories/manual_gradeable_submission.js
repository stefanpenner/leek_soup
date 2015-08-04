import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  // Attributes
  grading_comment: null,
  grade: null,
  completed: false,
  overdue: false,
  marked: false,
  handed_in_on: null,
  grade_sent: false,
  status: 'not-submitted',
  comment_ids: [],
  event_ids: [],
  version_ids: [],
  created_at: Date.now(),
  updated_at: Date.now(),

  // Relations
  student_id: () => server.create('student').id
});
