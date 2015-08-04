import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['language-dropdown'],
  // TODO: Get the locales form the i18n service
  locales: [
    { id: 'es',    imageTag: Ember.String.htmlSafe('<img src="/images/flags/es.svg" height="16" width="24" alt="spanish">') },
    { id: 'en',    imageTag: Ember.String.htmlSafe('<img src="/images/flags/gb.svg" height="16" width="24" alt="uk-english">') },
    { id: 'en_US', imageTag: Ember.String.htmlSafe('<img src="/images/flags/us.svg" height="16" width="24" alt="us-english">') },
  ],
  locale: Ember.computed({
    get() { return this.i18n.get('locale'); },
    set(_, v) {
      this.i18n.set('locale', v);
      // TODO: Persist preference somehow
      return v;
    }
  })
});
