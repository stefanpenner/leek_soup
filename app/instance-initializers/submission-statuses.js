export function initialize({registry, container}) {
  const i18n = container.lookup('service:i18n');
  const submissionStatuses = [
    { id: 'submitted',      label: i18n.t('submissionStatuses.submitted')},
    { id: 'submitted-late', label: i18n.t('submissionStatuses.submitted-late')},
    { id: 'absent',         label: i18n.t('submissionStatuses.absent')},
    { id: 'resubmission',   label: i18n.t('submissionStatuses.resubmission')},
    { id: 'not-submitted',  label: i18n.t('submissionStatuses.not-submitted')}
  ];
  submissionStatuses.prompt = i18n.t('submissionStatuses.prompt');
  registry.register('service:submission-statuses', submissionStatuses, { instantiate: false, singleton: true });
  registry.injection('controller', 'submissionStatuses', 'service:submission-statuses');
  registry.injection('component', 'submissionStatuses', 'service:submission-statuses');
}

export default {
  name: 'submission-statuses',
  after: 'ember-i18n',
  initialize: initialize
};
