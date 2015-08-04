import Ember from 'ember';
import DS from 'ember-data';
import ManualGradeableSubmission from '../manual-gradeable-submission/model';

const { computed } = Ember;

export default ManualGradeableSubmission.extend({
  // Relations
  homework: DS.belongsTo('homework', { async: true }),

  // Aliases
  assignment: computed.alias('homework')
});
