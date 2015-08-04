/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'smhw-frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {

    },

    torii: {
      providers: {
        'facebook-oauth2': {
          apiKey: '703177416474566',
        },
        'google-oauth2': {
          apiKey: '224232618222-5b338vq6gqvv27vts6c4j5n6eunuk5tm.apps.googleusercontent.com',
        }
      }
    },

    subdomainMapping: {
      'ember': 'default',
      'ember.smhwdev': 'default',
      'www': 'default'
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *.lvh.me lvh.me http://copley.lvh.me:35729 lvh.me:35729 *.lvh.me:35729 d2zah9y47r7bi2.cloudfront.net mt0.googleapis.com maps.gstatic.com maps.googleapis.com",
      'font-src': "'self' data: *",
      'frame-src': "https://www.google.com/maps/embed/v1/place https://crocodoc.com",
      'img-src': "'self' placehold.it https://placeholdit.imgix.net/ usage.trackjs.com maps.gstatic.com mt0.googleapis.com mt1.googleapis.com",
      'connect-src': "'self' http://tts.readspeaker.com/a/speak ws://lvh.me:35729 ws://*.lvh.me:35729 ws://copley.lvh.me:35729",
      'media-src': "'self' http://tts.readspeaker.com/a/speak",
      'object-src': "'self'",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com"
    },

    APP: {

    }
  };

  ENV.i18n = {
    defaultLocale: 'en'
  };

  ENV.APIhost = '';
  ENV.APInamespace = '';
  ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:oauth2-bearer'
  }

  ENV['simple-auth-oauth2'] = {
    serverTokenEndpoint: '/oauth/token?grant_type=password&client_id=ec1f8f758294ef3838d5e178cc7c45454dd9fa75843dda5a131179c42accdca3&client_secret=e460aac4c862e5452ec34f230c12dbacd15284a2fab3e5eeb4b6a6f73289ae65'
  }

  // Application configuration
  ENV.gradebookPageSize = 20;
  // these are defaults, they make testing easier
  ENV.homeworkListPageSize = 4;
  ENV.resourcesHomeworksPageSize = 20;
  ENV.classesHomeworksPageSize = 20;
  ENV.teacherDashboardHomeworkLimit = 20;
  ENV.manageUserPageSize = 5;
  ENV.announcementEventsLimit = 3;

  if (environment === 'development') {
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.torii.providers['facebook-oauth2'].redirectUri = 'http://localhost:4200/oauth/facebook';
    ENV.torii.providers['google-oauth2'].redirectUri = 'http://localhost:4200/oauth/google';
  }

  if (environment === 'production') {
    ENV.READSPEAKER_URL = 'http://tts.readspeaker.com/a/speak';
    ENV.APIhost = '//api.showmyhomework.co.uk';

    if (process.env.DESTINATION === 'beta') {
      ENV.APIhost = '//api.smhwbeta.co.uk';

    } else if (process.env.DESTINATION === 'qa') {
      ENV.APIhost = '//api.smhwdev.co.uk';
    }

    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: ENV.APIhost + '/oauth/token?grant_type=password&client_id=a44486a71714841f51744b66582427f2c094e48675b40530341d470c26d63bbd&client_secret=243a91065893d1e701d7f5d4ddf6d564a0e0559dfe872e6e6dfba849440af81d'
    },

    ENV.APInamespace = 'api'

    // Application configuration
    ENV.gradebookPageSize = 15;
    ENV.homeworkListPageSize = 15;
    ENV.resourcesHomeworksPageSize = 16;
    ENV.manageUserPageSize = 20;
  }

  if (environment === 'test') {
    // ENV.APInamespace = 'api';
    ENV.resourcesHomeworksPageSize = 4;
    ENV.baseURL = '/';
    ENV.APInamespace = '';
    ENV.locationType = 'none';
    ENV.READSPEAKER_URL = '/a/speak';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    }
  }
  return ENV;
};
