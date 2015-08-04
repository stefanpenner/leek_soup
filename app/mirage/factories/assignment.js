import Mirage from 'ember-cli-mirage';
import moment from 'moment';

export default Mirage.Factory.extend({
  // Attributes
  description: 'Do this task carefully',
  subject: 'Math',
  reason: 'exam_preparation',
  due_on: moment().add(2, 'days').format('YYYY-MM-DD'),
  issued_on: moment().subtract(2, 'days').format('YYYY-MM-DD'),
  title: i => `Solve the X when Y is ${i}`,
  created_at: () => new Date(),
  published_at: () => new Date(),
  updated_at: () => new Date(),

  // Relations
  teacher_id: () => server.create('employee').id,
  school_id: () => server.create('school').id,
  class_group_id: () => server.create('class_group').id,
  marking_scheme_id: null
});
