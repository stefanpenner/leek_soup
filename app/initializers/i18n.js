export function initialize(container, application) {
  application.inject('route', 'i18n', 'service:i18n');
  application.inject('component', 'i18n', 'service:i18n');
}

export default {
  name: 'i18n',
  initialize: initialize
};
