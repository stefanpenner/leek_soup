import Ember from 'ember';

const { isBlank } = Ember;
const validUrlRegex = /^\s*((http|https)\:\/\/)?([a-z\d\-]{1,63}\.)*[a-z\d\-]{1,255}\.([a-z]{2,6}\s*)?([a-z]{2,6}(\/|\?).*)?$/;

export default Ember.Component.extend({
  classNameBindings: ['hasError'],
  keyPress(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.send('add', this.get('value'));
    }
  },
  actions: {
    add(url) {
      if (isBlank(url)) {
        return;
      }
      let valid = validUrlRegex.test(url);
      this.set('hasError', !valid);
      if (valid) {
        this.get('model.webLinks').addObject({ url });
        this.set('value', '');
      }
    },
    remove(webLink) {
      this.get('model.webLinks').removeObject(webLink);
    }
  }
});
