import Ember from 'ember';

const { get } = Ember;

export function assignmentRouteName([assignment], { type } = {}) {
  type = type || assignment && get(assignment, 'type');
  if (!type) { return; }
  const pieces = ['authenticated', Ember.String.dasherize(Ember.String.pluralize(type)), 'reuse'];
  return pieces.join('.');
}

export default Ember.HTMLBars.makeBoundHelper(assignmentRouteName);
