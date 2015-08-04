export function initialize({container, registry}) {
  const i18n = container.lookup('service:i18n');
  const announcementStrategies = [
    { id: 'year', label: i18n.t('announcementStrategies.yearGroup')},
    { id: 'class', label: i18n.t('announcementStrategies.classGroup')},
    { id: 'registration', label: i18n.t('announcementStrategies.registrationGroup')},
    { id: 'school', label: i18n.t('announcementStrategies.school')}
  ];
  registry.register('service:announcement-strategies', announcementStrategies, { instantiate: false, singleton: true });
  registry.injection('controller', 'announcementStrategies', 'service:announcement-strategies');
  registry.injection('component', 'announcementStrategies', 'service:announcement-strategies');
}

export default {
  name: 'announcement-strategies',
  after: 'ember-i18n',
  initialize: initialize
};
