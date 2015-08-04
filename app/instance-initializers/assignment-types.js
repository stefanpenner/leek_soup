import Ember from 'ember';

function initialize({ registry }) {
  const assignmentTypes = [
    Ember.Object.create({ id: "Homework", label: 'Homework' }),
    Ember.Object.create({ id: "Quiz", label: 'Quiz' }),
    Ember.Object.create({ id: "ClassTest", label: 'Class Test' }),
    Ember.Object.create({ id: "SpellingTest", label: 'Spelling Test' }),
    Ember.Object.create({ id: "DifferentiatedHomework", label: "Differentiated Homework" })
  ];
  registry.register('service:assignment-types', assignmentTypes, { instantiate: false, singleton: true });
  registry.injection('controller', 'assignmentTypes', 'service:assignment-types');
  registry.injection('component', 'assignmentTypes', 'service:assignment-types');
}

export default {
  name: 'assignment-types',
  initialize: initialize
};
