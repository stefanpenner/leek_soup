import Ember from 'ember';

export function initialize({ registry, container }) {
  const i18n = container.lookup('service:i18n');
  const userTitles = Ember.ArrayProxy.create({content: Ember.A([
    { id: 1, key: i18n.t('shared.mr')},
    { id: 2, key: i18n.t('shared.mrs')},
    { id: 3, key: i18n.t('shared.ms')},
    { id: 4, key: i18n.t('shared.miss')}
  ])});

  registry.register('service:user-titles', userTitles, { instantiate: false, singleton: true });
}

export default {
  name: 'user-titles',
  after: 'ember-i18n',
  initialize: initialize
};
