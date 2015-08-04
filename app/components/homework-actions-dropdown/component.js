import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['homework-actions-dropdown'],
  isOpen: false,
  title: null,
  // Actions
  actions: {

    toggleMenu() { this.toggleProperty('isOpen'); }
  }
});
