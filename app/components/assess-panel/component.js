import Ember from 'ember';

const { computed } = Ember;
const gradeableTypes = ['homework-submission', 'class-test-submission', 'differentiated-homework-submission'];

export default Ember.Component.extend({
  classNames: ['assess-panel'],

  // CPs
  selectedIds: computed('submissionIds', function() {
    let submissionIds = this.get('submissionIds');
    if (submissionIds === null || submissionIds === undefined) {
      return [];
    }
    return submissionIds.split(',');
  }),

  selectedSubmissions: computed('selectedIds', 'assignment.submissions.length',function() {
    let ids = this.get('selectedIds');
    let submissions = this.get('assignment.submissions') || [];
    return submissions.filter(s => ids.includes(s.get('id')));
  }),

  canGrade: computed('assignment.submissions.firstObject', function() {
    const submission = this.get('assignment.submissions.firstObject');
    if (!submission) {
      return;
    }
    return gradeableTypes.includes(submission.constructor.modelName);
  }),

  multipleSelect: computed.alias('canGrade'),

  // Actions
  actions: {
    submissionClicked(submission, clickEvent) {
      let selectedSubmissions = this.get('selectedSubmissions');
      if (selectedSubmissions.includes(submission)) {
        this.unselectSubmission(submission);
      } else {
        this.selectSubmission(submission, clickEvent);
      }
    }
  },

  // Methods
  selectSubmission(submission /*, clickEvent */) {
    if (this.get('multipleSelect')) {
      // TODO: Use the clickEvent to handle Shift + Click.
      let ids = this.get('selectedSubmissions').mapBy('id');
      ids.push(submission.get('id'));
      this.sendAction('action', { ids });
    } else {
      this.sendAction('action', { ids: [submission.get('id')] });
    }
  },

  unselectSubmission(submission /*, clickEvent */) {
    // TODO: Use the clickEvent to handle Shift + Click.
    let ids = this.get('selectedSubmissions').mapBy('id');
    ids.removeObject(submission.get('id'));
    if (Ember.isEmpty(ids)) {
      ids = null;
    }
    this.sendAction('action', { ids });
  }
});
