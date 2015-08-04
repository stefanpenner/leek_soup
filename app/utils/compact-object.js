import Ember from 'ember';

const { isPresent } = Ember;

export default function compactParam(obj) {
  return Object.keys(obj).reduce((memo, k) => {
    if (isPresent(obj[k])) { memo[k] = obj[k]; }
    return memo;
  }, {});
}
