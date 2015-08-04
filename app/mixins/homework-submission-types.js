import Ember from 'ember';
import DS from 'ember-data';
const { computed } = Ember;

export default Ember.Mixin.create({
  submissionType: DS.attr('string'),
  handInOnline: computed.equal('submissionType', 'online_submission')
});
