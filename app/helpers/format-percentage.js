import Ember from 'ember';
import { roundNumber } from './round-number';

export function formatPercentage() {
  return `${roundNumber(...arguments)}%`;
}

export default Ember.HTMLBars.makeBoundHelper(formatPercentage);
