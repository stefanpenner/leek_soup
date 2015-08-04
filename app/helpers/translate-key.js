import Ember from 'ember';

export function translateKey([key]) {
  return this.container.lookup('service:I18n').t(key);
}

export default Ember.HTMLBars.makeBoundHelper(translateKey);
