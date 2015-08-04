import Ember from 'ember';

export function truncate(params, { length }) {
  let str = params[0];
  if (!str) {
    return '';
  }
  length = length || 100;
  if (str && (str.length >= length)) {
    return str.substring(0, length) + '...';
  } else {
    return  str;
  }
}

export default Ember.HTMLBars.makeBoundHelper(truncate);
