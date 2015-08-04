import Ember from 'ember';

export function initialize({ registry }) {
  const service = Ember.ObjectProxy.create({ isServiceFactory: true });
  registry.register('service:current-school', service, { instantiate: false, singleton: true });
  registry.injection('route', 'currentSchool', 'service:current-school');
  registry.injection('controller', 'currentSchool', 'service:current-school');
  registry.injection('component', 'currentSchool', 'service:current-school');
  registry.injection('serializer', 'currentSchool', 'service:current-school');
}

export default {
  name: 'current-school',
  after: 'current-user',
  initialize: initialize
};
