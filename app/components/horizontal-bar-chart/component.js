import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['charts'],
  classNameBindings: ['markers:with-markers', 'animated', 'clipped'],

  didInsertElement() {
    if (this.animated) {
      this.animateBars();
    }
  },

  animateBars() {
    this.set('clipped', true);
    Ember.run.later(() => {
      if (!this.isDestroyed) {
        this.set('clipped', false);
      }
    }, 200);
  }
});
