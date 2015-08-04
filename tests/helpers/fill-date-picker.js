import Ember from 'ember';

export default Ember.Test.registerHelper('fillDatePicker', function (app, {selector, option}) {
  $(selector).find('input').val(option);
});
