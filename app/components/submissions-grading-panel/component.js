import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['submissions-grading-panel', 'submissions-detail-panel'],
  showCommentsForm: false,

  // CPs
  grades: computed('assignment.markingScheme.grades', function() {
    let grades = this.get('assignment.markingScheme.grades');

    if(grades) {
      grades = grades.split(',');
      let gradeOptions = [];
      grades.forEach(function(grade){
        gradeOptions.push({ id: grade, value: grade });
      });
      return gradeOptions;
    } else {
      return [
        { id: 'N/A', value: 'N/A' }
      ];
    }
  }),
  grade: computed('submissions.firstObject.grade', function() {
    const grade = this.get('submissions.firstObject.grade');
    return this.get('grades').find(g => g.id === grade);
  }),

  isEmpty: computed.empty('submissions'),
  multipleSelection: computed.gt('submissions.length', 1),
  comments: computed.alias('submissions.firstObject.comments'),
  events: computed.alias('submissions.firstObject.events'),
  versions: computed.alias('submissions.firstObject.versions'),
  emptyComment: computed.empty('commentText'),
  selectedStudentForenames: computed.mapBy('submissions', 'student.forename'),
  selectedStudentsNamesSentence: computed('selectedStudentForenames.length', function() {
    let forenames = this.get('selectedStudentForenames');
    if (forenames.length === 2) {
      return forenames.join(' and ');
    } else if (forenames.length === 3) {
      return [[forenames[0], forenames[1]].join(', '), forenames[2]].join(' and ');
    } else {
      return [[forenames[0], forenames[1]].join(', '), `${forenames.length - 2} more`].join(' and ');
    }
  }),

  // Actions
  actions: {
    updateSubmissionStatus: function(value) {
      this.get('submissions').forEach(function(submission) {
        submission.set('status', value);
        submission.save();
      });
    },

    updateSubmissionGrade: function(value) {
      this.get('submissions').forEach(function(submission) {
        submission.set('grade', value);
        submission.save();
      });
    },

    toggleCommentsForm() {
      this.toggleProperty('showCommentsForm');
    }
  }
});
