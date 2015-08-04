import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';
import initializeTestHelpers from 'simple-auth-testing/test-helpers';
import './sign-in';
import './sign-out';
import './pick-select-option';
import './assert-selected';
import './fill-date-picker';
import './assert-basic-homework-fields-present';
import './current-params';

initializeTestHelpers();

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
