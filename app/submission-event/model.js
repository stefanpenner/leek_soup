import Ember from 'ember';
import DS from 'ember-data';
var computed = Ember.computed;

export default DS.Model.extend({
  content: DS.attr('string'),
  eventType: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  teacher: DS.belongsTo('employee', { async: true }),
  submission: DS.belongsTo('homework-submission', { async: true }),

  componentString: computed('eventType', function(){
    let eventType = this.get('eventType');
    if(eventType) {
      return 'submission-activity-feed-event-' + this.get('eventType');
    }
  }),
});
