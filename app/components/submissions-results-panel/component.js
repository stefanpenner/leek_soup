import Ember from 'ember';

const { computed, get } = Ember;

export default Ember.Component.extend({
  classNames: ['submissions-results-panel', 'submissions-detail-panel'],

  // CPs
  averageGrade: computed('submissions.@each.grade', function() {
    const grades = get(this, 'submissions').mapBy('grade').filter(x => !!x);
    if (grades.length < 1) {
      return;
    }
    const result = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    return result;
  }),
  isQuiz: computed('submissions', function() {
    return this.get('submissions.firstObject.assignment.type') === 'quiz';
  }),
  isSpellingTest: computed('submissions', function() {
    return this.get('submissions.firstObject.assignment.type') === 'spelling-test';
  })
});
