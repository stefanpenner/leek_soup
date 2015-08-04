import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('pickSelectOption', function(app, {selector, option}) {
  if (Array.isArray(option)) {
    option.forEach((single_option) => {
      andThen(() => {
        find(`${selector} .select2-container`).select2('open');
      });

      andThen(() => {
        Ember.$(`.select2-results .select2-result-selectable div:contains("${single_option}")`)
          .trigger('mouseup');
      });
    });
  } else {
    find(`${selector} input.form-control`).val(option).trigger('change');
  }
});
