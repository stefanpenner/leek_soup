import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({
  announcementsEnabled: DS.attr('boolean'),
  email:                DS.attr('string'),
  expiresOn:            DS.attr('date'),
  googleAppDomain:      DS.attr('string'),
  homepageActive:       DS.attr('string'),
  livechatEnabled:      DS.attr('boolean'),
  locale:               DS.attr('string'),
  onlineClassesEnabled: DS.attr('boolean'),
  prospectus:           DS.attr('string'),
  studentSignupEnabled: DS.attr('boolean'),
  teacherSignupEnabled: DS.attr('boolean'),
  trial:                DS.attr('boolean'),
  // Relations
  markingSchemes:       DS.hasMany('marking-scheme', { async: true }),

  // TODO, for time values.
  timeSlots: [
    { id: 1, unit: 'minutes'},
    { id: 2, unit: 'hours'},
    { id: 3, unit: 'days'},
    { id: 4, unit: 'weeks'}
  ],
  homeworkPurposes: [
    { id: 1, name: 'Exam preparation'},
    { id: 2, name: 'Witchcraft'},
    { id: 3, name: 'Mental enhancements'}
  ],

  //CP's
  markingSchemesActive: computed('markingSchemes.@each.active', 'markingSchemes.isFulfilled', function(){
    return this.get('markingSchemes').filterBy('active');
  })
});
