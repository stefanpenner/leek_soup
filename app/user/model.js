import Ember from 'ember';
import DS from 'ember-data';

var computed = Ember.computed;
export default DS.Model.extend({
  // Attributes
  administrator: DS.attr('boolean'),
  avatar: DS.attr('string'),
  createdAt: DS.attr('date'),
  forename: DS.attr('string'),
  mobileBetaUser: DS.attr('boolean'),
  surname: DS.attr('string'),
  title: DS.attr('string'),
  updatedAt: DS.attr('date'),

  // Relations
  school: DS.belongsTo('school', { async: true }),
  userPrivateInfo: DS.belongsTo('user-private-info', { async: true }),

  // Aliases
  bio: computed.alias('userPrivateInfo.bio'),
  email: computed.alias('userPrivateInfo.email'),
  lastActivityAt: computed.alias('userPrivateInfo.lastActivityAt'),
  username: computed.alias('userPrivateInfo.username'),
  personalNr: computed.alias('userPrivateInfo.personalNr'),
  password: computed.alias('userPrivateInfo.password'),
  uniqueId: computed.alias('userPrivateInfo.uniqueId'),
  hasFilledDetails: computed.alias('userPrivateInfo.hasFilledDetails'),
  type: computed(function() { return this.constructor.modelName; }),
  rootFolder: computed.alias('userPrivateInfo.rootFolder'),

  // CPs
  fullName: computed('forename', 'surname', function() {
    return [this.get("forename"), this.get("surname")].join(' ');
  }),

  fullNameTitle: computed('title', 'fullName', function() {
    return [this.get("title"), this.get("fullName")].join(' ');
  }),

  fullNameTitleInitial: computed('title', 'fullName', function() {
    const forename = this.get('forename');
    if (forename){
      return [this.get('title'), forename.charAt(0), this.get('surname')].join(' ');
    }
  })
});
