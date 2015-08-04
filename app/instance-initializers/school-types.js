export function initialize({ registry, container }) {
  const i18n = container.lookup('service:i18n');
  const schoolTypes = [
    { id: 1, value: 'primary_school', key: i18n.t('admin.personalise.primarySchool')},
    { id: 2, value: 'secondary_school', key: i18n.t('admin.personalise.secondarySchool')}
  ];

  registry.register('service:school-types', schoolTypes, { instantiate: false, singleton: true });
}

export default {
  name: 'school-types',
  after: 'ember-i18n',
  initialize: initialize
};
