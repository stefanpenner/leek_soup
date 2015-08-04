import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  attachments: DS.hasMany('attachment', { async: true })
});
