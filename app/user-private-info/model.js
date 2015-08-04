import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  bio:              DS.attr('string'),
  email:            DS.attr('string'),
  lastActivityAt:   DS.attr('date'),
  username:         DS.attr('string'),
  personalNr:       DS.attr('number'),
  uniqueId:         DS.attr('number'),
  totalStorageUsed: DS.attr('number'),
  password:         DS.attr('string'),

  // Relations
  rootFolder:       DS.belongsTo('document-file', { async: true }),

  // CPs
  hasFilledDetails: Ember.computed.bool('lastActivityAt')
});
