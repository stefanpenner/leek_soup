import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  startDate: Ember.computed(function (){
    return moment().subtract(3, 'days').format('DD/MM/YYYY');
  })
});