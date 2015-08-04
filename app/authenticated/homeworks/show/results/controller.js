import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Submission',
  submission: Ember.computed.alias('model.submissions.firstObject')
});
