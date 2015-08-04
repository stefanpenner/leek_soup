import Ember from 'ember';

export function replaceEmptyWithDashes([value]) {
  return value || '--';
}

export default Ember.HTMLBars.makeBoundHelper(replaceEmptyWithDashes);
