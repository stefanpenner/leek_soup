/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var babelConfig = {};
if (EmberApp.env() === 'development') {
  // Since in development we always use evergreen browsers we can alleviate
  // babel from doing some ES6 transformations (and therefore be faster)
  babelConfig = {
    blacklist: [
      'es6.spec.templateLiterals',
      'es6.properties.shorthand',
      'es6.forOf',
      'es6.constants',
      'es6.blockScoping',
      'es6.spec.symbols'
    ]
  };
}

var assetHost = '//s3-eu-west-1.amazonaws.com/smhw-frontend-production/';

if (EmberApp.env() === 'production') {
  if (process.env.DESTINATION === 'beta') {
    assetHost = '//s3-eu-west-1.amazonaws.com/smhw-frontend-beta/';

  } else if (process.env.DESTINATION === 'qa') {
    assetHost = '//s3-eu-west-1.amazonaws.com/smhw-frontend-qa/';
  }
}

var app = new EmberApp({
  es3Safe: false,
  fingerprint: {
    prepend: assetHost
  },
  minifyCSS: {
    enabled: false
  },
  minifyJS: {
    enabled: false
  },
  babel: babelConfig,
  sassOptions: {
    includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']
  }
});

app.import('vendor/fonts/OpenSans/OpenSans.eot', { destDir: 'assets/fonts' });
app.import('vendor/fonts/OpenSans/OpenSans.svg', { destDir: 'assets/fonts' });
app.import('vendor/fonts/OpenSans/OpenSans.ttf', { destDir: 'assets/fonts' });
app.import('vendor/fonts/OpenSans/OpenSans.woff', { destDir: 'assets/fonts' });

app.import('vendor/fonts/OpenSans-Bold/OpenSans-Bold.eot', { destDir: 'assets/fonts' });
app.import('vendor/fonts/OpenSans-Bold/OpenSans-Bold.svg', { destDir: 'assets/fonts' });
app.import('vendor/fonts/OpenSans-Bold/OpenSans-Bold.ttf', { destDir: 'assets/fonts' });
app.import('vendor/fonts/OpenSans-Bold/OpenSans-Bold.woff', { destDir: 'assets/fonts' });

app.import('vendor/fonts/OpenSans-Semibold/OpenSans-Semibold.eot', { destDir: 'assets/fonts' });
app.import('vendor/fonts/OpenSans-Semibold/OpenSans-Semibold.svg', { destDir: 'assets/fonts' });
app.import('vendor/fonts/OpenSans-Semibold/OpenSans-Semibold.ttf', { destDir: 'assets/fonts' });
app.import('vendor/fonts/OpenSans-Semibold/OpenSans-Semibold.woff', { destDir: 'assets/fonts' });

app.import('vendor/fonts/themify/themify.eot', { destDir: 'assets/fonts' });
app.import('vendor/fonts/themify/themify.svg', { destDir: 'assets/fonts' });
app.import('vendor/fonts/themify/themify.ttf', { destDir: 'assets/fonts' });
app.import('vendor/fonts/themify/themify.woff', { destDir: 'assets/fonts' });

app.import('vendor/fonts/Pe-icon-7-stroke.eot', { destDir: 'assets/fonts' });
app.import('vendor/fonts/Pe-icon-7-stroke.svg', { destDir: 'assets/fonts' });
app.import('vendor/fonts/Pe-icon-7-stroke.ttf', { destDir: 'assets/fonts' });
app.import('vendor/fonts/Pe-icon-7-stroke.woff', { destDir: 'assets/fonts' });

app.import('vendor/fonts/FontAwesome/flaticon.eot', { destDir: 'assets/fonts' });
app.import('vendor/fonts/FontAwesome/flaticon.svg', { destDir: 'assets/fonts' });
app.import('vendor/fonts/FontAwesome/flaticon.ttf', { destDir: 'assets/fonts' });
app.import('vendor/fonts/FontAwesome/flaticon.woff', { destDir: 'assets/fonts' });

app.import('vendor/fonts/Linearicons/Linearicons.eot', { destDir: 'assets/fonts' });
app.import('vendor/fonts/Linearicons/Linearicons.svg', { destDir: 'assets/fonts' });
app.import('vendor/fonts/Linearicons/Linearicons.ttf', { destDir: 'assets/fonts' });
app.import('vendor/fonts/Linearicons/Linearicons.woff', { destDir: 'assets/fonts' });

app.import('bower_components/core.js/client/core.min.js');

app.import('vendor/redactor/redactor.css');
app.import('vendor/redactor/redactor.min.js');
app.import('vendor/redactor/fullscreen.js');

module.exports = app.toTree();
