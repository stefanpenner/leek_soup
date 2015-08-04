import Ember from 'ember';

export function humanizeIndex(index) {
  return Number(index) + 1;
}

export default Ember.HTMLBars.makeBoundHelper(humanizeIndex);