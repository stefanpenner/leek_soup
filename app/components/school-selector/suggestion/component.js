import Ember from 'ember';
import { highlightCP } from 'smhw-frontend/utils/custom-computed-properties';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['suggestion'],
  classNameBindings: ['active'],
  name: highlightCP('school.name', 'filter'),
  fullAddress: highlightCP('school.address', 'filter'),

  // Events
  click() {
    this.attrs.onclick();
  }
});
