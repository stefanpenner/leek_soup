import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: '',

  // CPs
  style: computed('percentage', function() {
    const percentage = this.get('percentage');
    const str = percentage == null ? 'visibility: hidden' : `width: ${percentage}%`;
    return Ember.String.htmlSafe(str);
  }),

  veryShort: computed('percentage', function() {
    return this.get('percentage') < 15;
  })
});
