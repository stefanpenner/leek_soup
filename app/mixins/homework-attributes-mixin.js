import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { computed, isBlank, isPresent } = Ember;

export default Ember.Mixin.create({
  createdAt:        DS.attr('date'),
  dueOn:            DS.attr('utc'),
  description:      DS.attr('string'),
  issuedOn:         DS.attr('utc'),
  publishedAt:      DS.attr('date'),
  title:            DS.attr('string', { defaultValue: '' }),
  handInOnline:     DS.attr('boolean'),
  updatedAt:        DS.attr('date'),
  purpose:          DS.attr('string'),
  subject:          DS.attr('string'),
  classYear:        DS.attr('string'),
  webLinks:         DS.attr(undefined, {
    defaultValue() { return []; }
  }),
  // Relations
  school:                   DS.belongsTo('school', { async: true }),
  teacher:                  DS.belongsTo('employee', { async: true }),
  classGroup:               DS.belongsTo('class-group', { async: true }),
  classGroupToDuplicateIn:  DS.hasMany('class-group', { async: true }),
  markingScheme:            DS.belongsTo('marking-scheme', { async: true }),

  // Other
  isReuse: false,

  // Aliases
  type: computed(function() {
    return this.constructor.modelName; // computed.alias doesn't work!! BUG IN EMBER?
  }),


  // CPs
  // I'm aware that this has a bug where a records is temporarily published while is
  // being edited and the update request is onFlight. I don't have time to fix this now.
  // This is because due to a bug in ember-data data while a record is inFlight the dirty attributes
  // are moved to `inFlightAttributes`, so the records appears to be clean when it's not.
  //
  isPublished: computed('publishedAt', 'dirtyType', 'hasDirtyAttributes', function() {
    if (!this.get('publishedAt') || this.get('dirtyType') === 'created') {
      return false;
    }
    const isClean = !this.get('hasDirtyAttributes');
    if (isClean) { return true; }
    const publishedAtIsDirty = !!this.changedAttributes().publishedAt;
    return !publishedAtIsDirty;
  }),
  isDraft: computed.not('isPublished'),
  isReusable: computed.not('isNew'),

  dasherizedType: computed('type', function() {
    return this.get('type').dasherize();
  }),

  humanizedType: computed('type', function() {
    return this.get('type').replace('-', ' ').capitalize();
  }),

  slug: computed('title', function(){
    return encodeURIComponent(`${this.get('id')}-${String(this.get('title')).replace(/\s+/g, '-').toLowerCase()}`);
  }),

  generalInformation: computed('classYear', 'classGroup.name', 'subject', 'type', function() {
    return `${this.get('classYear') }/${this.get('classGroup.name')} - ${this.get('subject').capitalize()} ${this.get('humanizedType')}`;
  }),

  daysLeft: computed('dueOn', 'issuedOn', function(){
    var a = moment(this.get('dueOn'));
    var b = moment();
    return a.diff(b, 'days') + 1;
  }),

  isMissingAttributes: computed('title', 'subject', 'description', 'classGroup', 'markingScheme', function() {
    const { title, subject, classGroup, markingScheme } = this.getProperties('title', 'subject', 'classGroup', 'markingScheme');
    return isBlank(title) || isBlank(subject) || isBlank(classGroup) || isBlank(markingScheme);
  }),

  /*
    Class group list used in form select.
    First element is a classGroup of current record.
    Rest elements will be used on backend to create class tasks for each of them.
  */
  allClassGroups: computed('classGroup', 'classGroups', {
    get() {
      let classGroups;

      // allClassGroups should be an array only for new models
      if (this.get('isNew')) {
        classGroups = [];
        if (isPresent(this.get('classGroup.id'))) {
          classGroups.push(this.get('classGroup'));
        }
        if (this.get('classGroupToDuplicateIn').length > 0) {
          classGroups = classGroups.concat(this.get('classGroupToDuplicateIn'));
        }
      } else {
        classGroups = this.get('classGroup');
      }
      return classGroups;
    },
    set(_, classGroups){
      if (Array.isArray(classGroups) && classGroups.length > 0) {
        this.set('classGroup', classGroups[0]);
        this.set('classGroupToDuplicateIn',
          classGroups.slice(1, classGroups.length));
      } else if (classGroups) {
        this.set('classGroup', classGroups);
        this.set('classGroupToDuplicateIn', []);
      } else {
        this.set('classGroup', null);
        this.set('classGroupToDuplicateIn', []);
      }
      return classGroups;
    }
  }),
});
