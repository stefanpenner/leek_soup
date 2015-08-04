import Ember from 'ember';
import ValidatedinputMixin from 'smhw-frontend/mixins/validated-input-mixin';

export default Ember.Component.extend(ValidatedinputMixin, {
  clock: Ember.inject.service(),
  classNames: ['smhw-datepicker', 'form-group'],
  classNameBindings: ['active', 'hasError'],

  // Config
  todayHighlight: true,
  weekStart: 1, // Monday
  format: Ember.computed('i18n.locale', function() {
    return this.i18n.t('localization.datepickerFormat').string;
  }),

  // Hooks
  didInsertElement(){
    this._super(...arguments);
    this.input = this.$('input');

    if (this.get('startDateToday')) {
      this._setStartDate(this.get('clock.now'));
    }

    if (this.get('startDate')) {
      this._setStartDate(this.get('startDate'));
    }

    let dependantAttribute = this.get('dependantAttribute');

    if (dependantAttribute) {
      let modelAttribute = 'model.' + this.get('dependantAttribute');
      Ember.addObserver(this, modelAttribute, this, function(newDate, dependantAttribute) {
        this._setStartDate(this.get(dependantAttribute));
      });
    }
  },

  focusIn() {
    this.set('active', true);
  },

  focusOut() {
    this.set('active', false);
  },

  _setStartDate(date) {
    let datePicker = this.$('.smhw-bootstrap-datepicker');
    datePicker.datepicker('setStartDate', date);
  },

  // Actions
  actions: {
    focusInput() {
      this.set('active', true);
      this.input.focus();
    }
  }
});
