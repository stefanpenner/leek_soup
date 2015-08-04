import Ember from 'ember';
import moment from 'moment';

const { computed } = Ember;

export default Ember.Controller.extend({
  startDate: computed(function (){
    return moment().subtract(3, 'days').format('DD/MM/YYYY');
  })
});
