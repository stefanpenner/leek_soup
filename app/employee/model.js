import DS from 'ember-data';
import User from 'smhw-frontend/user/model';
import Ember from 'ember';
import groupClassesByYear from 'smhw-frontend/utils/class-group/grouped-by-year';

const { computed } = Ember;

export default User.extend({
  // Attributes
  schoolAdmin:      DS.attr('boolean'),
  storeAccess:      DS.attr('boolean'),
  typeOverride:     DS.attr('boolean'),
  employeeType:     DS.attr('string'),
  recoverPin:       DS.attr('string'),
  homeworks:        DS.hasMany('homework', { async: true }),
  classGroups:      DS.hasMany('class-group', { async: true }),

  // CPs
  isTeacher: computed.equal('employeeType', 'teacher'),
  trainingVideosSeen: computed.filterBy('videoEvents', 'completed', true),
  classGroupsByYear: computed('classGroups.@each.classYear', 'classGroups.isFulfilled', function() {
    let myGroups = groupClassesByYear(this);
    let schoolGroups = groupClassesByYear(this.get('school'), this.get('classGroups').mapBy('id'));
    let i18n = this.container.lookup('service:i18n');
    return [
      {
        text: i18n.t('homeworks.classGroup.myGroupsTitle'),
        children: myGroups
      },
      {
        text: i18n.t('homeworks.classGroup.otherGroupsTitle'),
        children: schoolGroups
      },
    ];
  })
});
