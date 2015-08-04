import Ember from 'ember';

const { run, isBlank, RSVP, computed } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  selectedIndex: 0,

  // CPs
  activeSchool: computed('selectedIndex', 'schools', function() {
    const schools = this.get('schools');
    const numberOfSchools = schools.get('length');
    let selectedIndex = this.get('selectedIndex') % (numberOfSchools + 1);
    if (selectedIndex < 0) {
      selectedIndex += numberOfSchools;
    }
    return schools.objectAt(selectedIndex);
  }),

  // Actions
  actions: {
    search(value) {
      this.set('value', value);
      run.debounce(this, this.suggestSchools, 100);
    },

    select(school) {
      if (this.attrs.selectSchool(school)) {
        if (school) {
          this.set('value', school.get('name'));
        }
      } else {
        this.set('value', null);
      }
      this.get('search').finally(() => this.set('schools', []));
    },

    keypress(e) {
      if (e.keyCode === 38) {         // Arrow up
        this.decrementProperty('selectedIndex');
      } else if (e.keyCode === 40) {  // arrow down
        this.incrementProperty('selectedIndex');
      } else if (e.keyCode === 13) {  // Enter
        this.send('select', this.get('activeSchool'));
      } else if (e.keyCode === 9) {  // Tab
        this.send('select', this.get('activeSchool'));
        return; // Don't prevent default
      } else {
        return;
      }
      e.preventDefault();
    }
  },

  // Methods
  suggestSchools() {
    const filter = this.get('value');
    if (isBlank(filter) || filter.length < 2) {
      this.set('search', RSVP.resolve([]));
    } else {
      this.set('search', this.get('store').findQuery('school', { filter, limit: 5 }));
    }
    this.get('search').then(schools => {
      if (!this.isDestroyed) {
        this.set('schools', schools);
        this.set('filter', filter);
      }
    });
  }
});
