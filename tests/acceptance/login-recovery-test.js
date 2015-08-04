import Ember from 'ember';
import { module, test, skip } from 'qunit';
import startApp from 'smhw-frontend/tests/helpers/start-app';

var application, teacher, privateInfo;

module('Acceptance | login recovery', {
  beforeEach: function() {
    application = startApp();
    signOut();
    teacher = server.create('employee');
    privateInfo = server.db.user_private_infos.find(teacher.user_private_info_id);
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('recover login with email/password', function(assert) {
  visit('/login');
  click('a:contains("Forgot password?")');

  andThen(function() {
    assert.equal(currentURL(), '/login/recover');
    assert.equal(find('button:contains("Reset password")')[0].disabled, true, 'The button is disabled');
    fillIn('#recover-form-email input', privateInfo.email);
  });

  andThen(function() {
    assert.equal(find('button:contains("Reset password")')[0].disabled, false, 'The button is now enabled');
    click('.btn:contains("Reset password")');
  });

  andThen(function() {
    assert.equal(currentURL(), '/login', 'The user was redirected to the login page');
  });
});

test('recover login with pin', function(assert) {
  visit('/login');
  click('a:contains("Forgot password?")');
  click('a:contains("Or receive a new PIN login using your mobile")');

  andThen(function() {
    let btnSelector = '.btn:contains("Send verification code")';
    assert.equal(currentURL(), '/login/recover/pin');
  assert.equal(find(btnSelector)[0].disabled, true);
    fillIn('#recover-form-phone', '555666777');
    click(btnSelector);
  });

  andThen(function() {
    let btnSelector = '.btn:contains("Confirm")';
    assert.equal(currentURL(), '/login/verify');
    assert.equal(find(btnSelector)[0].disabled, true);
    fillIn('#verification-code input', '12345678');
    click(btnSelector);
  });

  andThen(function() {
    let btnSelector = '.btn:contains("Log in")';
    assert.equal(currentURL(), '/login/pin/sent');
    assert.equal(find(btnSelector)[0].disabled, true);
    fillIn('#sent-form-pin input', `A0000000${teacher.id}`);
    click(btnSelector);
  });

  andThen(function() {
    assert.equal(currentURL(), '/set-assignment');
  });
});

// Validations
skip('attempt to reset the password of a non-existent email', function(assert) {
  visit('/login/recover');
  fillIn('#recover-form-email input', "unknown@mail.com");
  click('.btn:contains("Reset password")');

  andThen(function() {
    assert.equal(find('#recover-form-email.has-error').length, 1, 'The email input contains errors');
    assert.ok(/invalid/.test(find('#recover-form-email').text()), 'This email is not in the system');
  });
});

skip('intriduce a wrong verification code', function(assert) {
  visit('/login/verify');
  fillIn('#verification-code input', "bad_code");
  click('.btn:contains("Confirm")');

  andThen(function() {
    assert.equal(find('#verification-code.has-error').length, 1, 'The code input contains errors');
    assert.ok(/invalid/.test(find('#recover-form-email').text()), 'Invalid verification code');
  });
});
