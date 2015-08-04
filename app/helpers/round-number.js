import Ember from 'ember';

const { round, pow } = Math;

export function roundNumber([number], { precission } = {}) {
  precission = precission || 0;
  if (Ember.isBlank(number)) {
    return '';
  }
  number = round(number * pow(10, precission)) / pow(10, precission);
  return `${number}`;
}


export default Ember.HTMLBars.makeBoundHelper(roundNumber);
