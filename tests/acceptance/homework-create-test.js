import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'smhw-frontend/tests/helpers/start-app';
import moment from 'moment';

var application, classGroup1, classGroup2;

module('Acceptance | HomeworkCreate', {
  beforeEach: function() {
    application = startApp();
    classGroup1 = server.create('class_group', { name: '01B' });
    classGroup2 = server.create('class_group', { name: '01C' });
    let teacher = server.create('employee', { class_group_ids: [classGroup1.id, classGroup2.id] });
    signIn({ user: teacher, type: 'employee' });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Creating a homework redirects to show', function(assert) {
  visit('/homeworks/new');

  let title = 'basket weaving';
  andThen( function () {
    assert.equal(currentPath(), 'authenticated.homeworks.new', 'renders authenticated.homeworks.new');
    assertBasicHomeworkFieldsPresent({assert});
    fillIn('.homework-title', title);
    pickSelectOption({selector: '.homework-purpose', option: 'Witchcraft'});
    pickSelectOption({selector: '.homework-subject', option: 'Mathematics and Physics'});
    pickSelectOption({selector: '.homework-class-group', option: ['01A', '01B']});
    pickSelectOption({selector: '.homework-marking-scheme', option: 'letter_scale'});
    pickSelectOption({selector: '.homework-submission-type', option: 'Magical other'});

    fillIn('.homework-duration', '60');
    pickSelectOption({selector: '.homework-unit', option: 'minutes'});

    fillDatePicker({selector: '.homework-issued-on', option: moment().format('MM/DD/YYYY')});
    fillDatePicker({selector: '.homework-due-on', option: moment().add(10, 'days').format('MM/DD/YYYY')});
    click('.submit-homework');
  });

  andThen( function () {
    assert.equal(currentURL(), `/homeworks/1-${title.dasherize()}`, 'creates a homework successfully');
  });
});

test('Creating an invalid homework, shows error messages', function(assert) {
  server.post('/homeworks',
    {
      errors: {
        title: ["blank"],
        purpose: ["invalid"],
        dueOn: ["invalid"],
      }
    }, 422);

  visit('/homeworks/new');

  andThen(function() {
    click('.submit-homework');

    andThen(function() {
      assert.equal($('.error-message[for="title"]').text(), "can't be blank", 'toggles error messages on input fields');
      assert.equal($('.error-message[for="purpose"]').text(), "seems invalid", 'toggles error messages on dropdown selects');
      assert.equal($('.error-message[for="dueOn"]').text(), "seems invalid", 'toggles error messages on datepickers');
    });
  });
});

test('Assign multiple groups', function(assert) {
  visit('/homeworks/new');

  andThen(function() {
    pickSelectOption({ selector: '.homework-class-group', option: ['01B', '01C'] });
  });

  andThen(() => {
    assertSelected(assert, '.homework-class-group', [classGroup1.id.toString(),
      classGroup2.id.toString()]);
  });
});
