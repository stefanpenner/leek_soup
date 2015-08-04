import Ember from 'ember';
import { formatPercentage } from 'smhw-frontend/helpers/format-percentage';

const { computed, get } = Ember;

export default Ember.Component.extend({
  classNames: ['submission-list-item'],
  classNameBindings: ['selected'],
  tagName: 'li',

  // CPs
  selected: computed('selectedIds.[]', function() {
    let ids = get(this, 'selectedIds') || [];
    return ids.includes(get(this, 'submission.id'));
  }),

  // When the grade is null, means that it haven't received a grade yet, and we display 'Unmarked'.
  // When the grade is undefined we don't know if has been graded yet or not (maybe waiting for
  // a promise) so we dont display anything.
  grade: computed('submission.grade', function() {
    const grade = get(this, 'submission.grade');
    if (grade === null) {
      return 'Unmarked';
    } else if (typeof grade === "number"){
      return formatPercentage([grade]);
    } else {
      return grade;
    }
  }),

  // Events
  click(event) {
    this.sendAction('action', get(this, 'submission'), event);
  }
});
