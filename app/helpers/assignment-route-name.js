import Ember from 'ember';

const { get } = Ember;
const { dasherize, pluralize } = Ember.String;

export function assignmentRouteName([assignment], { suffix, type } = {}) {
  type = type || assignment && get(assignment, 'type');
  if (!type) { return; }
  const pieces = ['authenticated', dasherize(pluralize(type)), 'show'];
  if (suffix) {
    pieces.push(suffix);
  }
  return pieces.join('.');
}

export default Ember.HTMLBars.makeBoundHelper(assignmentRouteName);
