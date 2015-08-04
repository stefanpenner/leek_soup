import Ember from 'ember';

export function stripHtml([string]) {
  return (string || '').replace(/(<([^>]+)>)/ig,"").trim();
}

export default Ember.HTMLBars.makeBoundHelper(stripHtml);
