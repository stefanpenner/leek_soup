import Ember from 'ember';
import { breadCrumbCP } from 'smhw-frontend/utils/custom-computed-properties';

export default Ember.Route.extend({
  breadCrumb: breadCrumbCP('setAssignment.breadCrumb')
});
