import Ember from 'ember';
import truncateHelper from 'smhw-frontend/helpers/truncate';

export function initialize(/* registry, application */) {
  Ember.HTMLBars._registerHelper('truncate', truncateHelper);
}

export default {
  name: 'helpers',
  initialize: initialize
};
