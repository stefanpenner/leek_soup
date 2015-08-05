import Ember from 'ember';
import { module, test, skip } from 'qunit';
import startApp from 'smhw-frontend/tests/helpers/start-app';

var application, teacher, privateInfo;

module('Acceptance | login', {
  beforeEach: function() {
    application = startApp();
    signOut();
    teacher = server.create('employee');
    privateInfo = server.db.user_private_infos.find(teacher.user_private_info_id);
  },

  afterEach: function() {
    Ember.run(invalidateSession);
    Ember.run(application, 'destroy');
    server.shutdown();
    window.server = undefined;
  }
});

test('login from /login with email and password', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    fillIn('#login-identification input', privateInfo.email);
    fillIn('#login-password input', "123123123");
    click('#email-login-form .btn:contains("Log in")');
  });

  andThen(function() {
    assert.equal(currentURL(), '/set-assignment');
  });
});

test('login from /login with username and password', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    fillIn('#login-identification input', `employee_${teacher.id}`);
    fillIn('#login-password input', "123123123");
    click('#email-login-form .btn:contains("Log in")');
  });

  andThen(function() {
    assert.equal(currentURL(), '/set-assignment');
  });
});

test('login from /login with pin', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    fillIn('#login-pin input', `A0000000${teacher.id}`);
    click('#pin-login-form .btn:contains("Log in")');
  });

  andThen(function() {
    assert.equal(currentURL(), '/set-assignment');
  });
});

test('login from /login/pin with pin', function(assert) {
  visit('/login/pin');

  andThen(function() {
    assert.equal(currentURL(), '/login/pin');
    fillIn('#input-pin input', `A0000000${teacher.id}`);
    click('.btn:contains("Log in")');
  });

  andThen(function() {
    assert.equal(currentURL(), '/set-assignment');
  });
});

test('login with PIN for the first time', function(assert) {
  visit('/login/pin');
  privateInfo.last_activity_at = null;
  andThen(function() {
    assert.equal(currentURL(), '/login/pin');
    fillIn('#input-pin input', `A0000000${teacher.id}`);
    click('.btn:contains("Log in")');
  });

  andThen(function() {
    assert.equal(currentURL(), '/login/details');
    assert.ok(find('.btn:contains("Log in")')[0].disabled, 'The button is disabled');
    fillIn('#details-password', '123123123');
    fillIn('#details-password-confirmation', '123123123');
    assert.ok(find('.btn:contains("Log in")')[0].disabled, 'The button is still disabled');
    fillIn('#details-identifier', 'bad@email');
    assert.ok(find('.btn:contains("Log in")')[0].disabled, 'The button is still disabled');
    fillIn('#details-identifier', 'good@email.com');
  });

  andThen(function() {
    assert.ok(!find('.btn:contains("Log in")')[0].disabled, 'The button is now enabled');
    click('.btn:contains("Log in")');
  });

  andThen(function() {
    assert.equal(currentURL(), '/set-assignment');
  });
});

test('visiting any section without having filled the basic details redirect to the details form', function(assert) {
  privateInfo.last_activity_at = null;
  signIn({ user: teacher, type: 'employee' });

  visit('/set-assignment');

  andThen(function() {
    assert.equal(currentURL(), '/login/details');
    Ember.run(invalidateSession);
  });
});

// Client side validations
test('typing an invalid pin in /login shows a client side validation error', function(assert) {
  visit('/login');
  fillIn('#login-pin input', 'A00A');

  andThen(function() {
    assert.equal(find('#login-pin.has-error').length, 1, 'The login input is styled as invalid ');
    assert.ok(/invalid format/i.test(find('#pin-login-form').text()), 'An error message appears');
  });
});

test('typing an invalid pin in /login/pin shows a client side validation error', function(assert) {
  visit('/login/pin');
  fillIn('#input-pin input', 'A00A');

  andThen(function() {
    assert.equal(find('#input-pin.has-error').length, 1, 'The login input is styled as invalid ');
    assert.ok(/invalid format/i.test(find('#input-pin').text()), 'An error message appears');
  });
});

test('typing an invalid pin in /login/pin/sent shows a client side validation error', function(assert) {
  visit('/login/pin/sent');
  fillIn('#sent-form-pin input', 'A00A');

  andThen(function() {
    assert.equal(find('#sent-form-pin.has-error').length, 1, 'The login input is styled as invalid ');
    assert.ok(/invalid format/i.test(find('#sent-form-pin').text()), 'An error message appears');
  });
});

// Server validations
test("attempt to login with an email that isn't in the system displays an error message", function(assert) {
  visit('/login');
  fillIn('#login-identification input', "unexistent@mail.com");
  fillIn('#login-password input', "123123123");
  click('#email-login-form .btn:contains("Log in")');

  andThen(function() {
    assert.equal(find('#login-identification.has-error').length, 1, 'The identification input contains errors');
    assert.ok(/This user is not in our system/i.test(find('#login-identification').text()), 'Username/email not found');
  });
});

test("attempt to login with wrong password displays an error message", function(assert) {
  visit('/login');
  fillIn('#login-identification input', privateInfo.email);
  fillIn('#login-password input', "bad_password");
  click('#email-login-form .btn:contains("Log in")');

  andThen(function() {
    assert.equal(find('#login-password.has-error').length, 1, 'The identification input contains errors');
    assert.ok(/incorrect password/i.test(find('#login-password').text()), 'Wrong password');
  });
});
