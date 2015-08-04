import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  class_year: 'Year 1',
  name: '1/Biology1',
  teacher_ids: [1, 2, 3],
  student_ids: [991,992,993,994,995,996,997,998,999]
});
