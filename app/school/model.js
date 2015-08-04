import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({
  // Attributes
  address: DS.attr('string'),
  country: DS.attr('string'),
  createdAt: DS.attr('date'),
  expiresOn: DS.attr('date'),
  description: DS.attr('string'),
  latitude: DS.attr('number'),
  tagLine: DS.attr('string'),
  homepageActive: DS.attr('boolean'),
  longitude: DS.attr('number'),
  name: DS.attr('string'),
  postCode: DS.attr('string'),
  schoolType: DS.attr('string'),
  subdomain: DS.attr('string'),
  timeZone: DS.attr('string'),
  town: DS.attr('string'),
  twitter: DS.attr('string'),
  updatedAt: DS.attr('string'),
  website: DS.attr('string'),
  teacherSignupEnabled: DS.attr('boolean'),
  studentSignupEnabled: DS.attr('boolean'),

  // Aliases
  email: computed.alias('schoolPrivateInfo.email'),
  locale: computed.alias('schoolPrivateInfo.locale'),

  // Relations
  schoolPrivateInfo: DS.belongsTo('school-private-info', { async: true }),
  classGroups: DS.hasMany('class-group', { async: true }),
  subjects: DS.hasMany('subject', { async: true }),
  classYears: DS.hasMany('class-year', { async: true }),
  students: DS.hasMany('student', { async: true }),
  parents: DS.hasMany('parent', { async: true }),
  employees: DS.hasMany('employee', { async: true }),

  // CPs
  teachers: computed.filterBy('employees', 'employeeType', 'teacher'),
  staffMembers: computed.filterBy('employees', 'employeeType', 'staff-member'),

  // Other

  assignmentReasons: [
    { id: 'exam_preparation', label: 'Exam preparation' },
    { id: 'revision',         label: 'Revision' },
    { id: 'learn_new_skills', label: 'Learn new skills' },
    { id: 'class_test',       label: 'Class Test' },
    { id: 'classwork',        label: 'Classwork' },
    { id: 'flip_learning',    label: 'Flip Learning' }
  ],

  submissionTypes: [
    { id: 'online_submission', text: 'Online submission (via SMHW)' },
    { id: 'class_submission', text: 'Class submission' },
    {
      text: "Other",
      children: [
        { id: 'GCSE Pod', text: 'GCSE Pod' },
        { id: 'MyMaths', text: 'MyMaths' },
        { id: 'Mathletics', text: 'Mathletics' },
        { id: 'Education City', text: 'Education City' },
        { id: 'Zondle', text: 'Zondle' },
        { id: 'AlfieSoft', text: 'AlfieSoft' },
        { id: 'Fronter', text: 'Fronter' },
        { id: 'FireFly', text: 'FireFly' },
        { id: 'Frog', text: 'Frog' },
        { id: 'Doddle', text: 'Doddle' },
        { id: 'Showbie', text: 'Showbie' }
      ]
    }
  ],

  quizQuestionTimeLimits: [
    { id: 15,  label: '15 seconds' },
    { id: 30,  label: '30 seconds' },
    { id: 60,  label: '60 seconds' },
    { id: 120, label: '120 seconds' }
  ]
});
