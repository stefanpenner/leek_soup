import { Ability } from 'ember-can';
import Ember from 'ember';

const { computed } = Ember;

export default Ability.extend({
  currentUser: Ember.inject.service('current-user'),

  canCreateAssignment: computed('currentUser', function() {
    let employeeType = this.get('currentUser.employeeType');
    if (!employeeType) {
      return false;
    }

    return ['teacher'].some(type => type === employeeType);
  }),

  canSeeAssignment: computed('currentUser', function() {
    const userType = this.get('currentUser.type');
    if (userType === 'student') {
      return this.get('model.submissions.length') === 1;
    } else if (this.get('currentUser.employeeType') === 'teacher') {
      return true;
    }
  }),

  canBeATeacher: computed('currentUser', function() {
    return this.get('currentUser.employeeType') === 'teacher';
  }),

  canBeATeacherOrStaffMember: computed('currentUser', function() {
    return ['employee'].includes(this.get('currentUser.type'));
  }),

  canEditThisHomework: computed('currentUser', function() {
    return this.get('currentUser.id') === this.get('model.teacher.id');
  })
});
