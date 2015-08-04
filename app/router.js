import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('authenticated', { path: '' }, function () {
    this.route('set-assignment');

    this.route('homeworks', function() {
      this.route('new');
      this.route('edit', { path: ':homework_slug/edit' });
      this.route('reuse', { path: ':homework_slug/reuse' });

      this.route('show', { path: ':homework_slug' }, function() {
        this.route('assess');
        this.route('results');
        this.route('submit');
        this.route('attachment', { path: 'attachment/:attachment_id' });
      });
    });
  });

  this.route('login', function() {
    this.route('pin', function() {
      this.route('sent');
    });
    this.route('recover', function() {
      this.route('pin');
    });
    this.route('verify');
    this.route('details');
  });

  this.route('sign-up');

  this.route('home', { path: '/' });
});

export default Router;
