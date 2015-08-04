import Ember from 'ember';
import { formatPercentage } from './format-percentage';

export function formatGrade([grade, assignmentType]) {
  if(assignmentType === 'quiz' || assignmentType === 'spelling-test') {
    if (typeof grade === 'number' && !Number.isNaN(Number(grade))) {
      return formatPercentage(...arguments);
    }
  } else {
    return grade;
  }
}

export default Ember.HTMLBars.makeBoundHelper(formatGrade);
