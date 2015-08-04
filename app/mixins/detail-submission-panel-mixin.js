import Ember from 'ember';
const { computed, get } = Ember;

export default Ember.Mixin.create({
  chartClass: computed('selected.grade', 'classAverage', function() {
    const grade   = get(this, 'selected.grade');
    const average = get(this, 'classAverage');
    return grade != null && average != null ? 'visible' : 'invisible';
  }),

  relativePerformance: computed('selected.grade', 'classAverage', function() {
    const grade = Math.round(get(this, 'selected.grade'));
    const classAverage = Math.round(get(this, 'classAverage'));
    if (grade === classAverage) {
      return 'on-the-average';
    } else if (grade > classAverage) {
      return 'over-the-average';
    } else {
      return 'below-the-average';
    }
  }),

  chartEntries: computed('selected.grade', 'selected.studentName', 'classAverage', function() {
    let grade = get(this, 'selected.grade');
    if (isNaN(grade)) {
      grade = 0;
    }
    const studentEntry = { percentage: grade, legend: get(this, 'selected.studentName') };
    const classEntry = { percentage: get(this, 'classAverage'), legend: 'Class average' };
    return [studentEntry, classEntry];
  })
});
