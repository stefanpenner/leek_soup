import Ember from 'ember';

export function highlightedSpan(content) {
  return `<span class="highlighted">${content}</span>`;
}

export default Ember.HTMLBars.makeBoundHelper(highlightedSpan);
