/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hebe-dash',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicy: {
      'img-src': "'self' http://*:35729",
      'connect-src': "'self' http://*:35729",
      'script-src': "'self' 'unsafe-eval' localhost:31609 0.0.0.0:31609",
      'font-src' : "'self'",
      'style-src': "'self'"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      dataMillUrl: 'http://api.leedsdatamill.org/'
      
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
        'script-src': "*",
        'font-src': "*",
        'connect-src': "*",
        'img-src': "*",
        'style-src': "'unsafe-inline', * ",
        'frame-src':"*"
    }
//    ENV.contentSecurityPolicy = {
//        'default-src': "'none'",
//        'script-src': "'self' 'unsafe-inline' 'unsafe-eval' w.sharethis.com ajax.googleapis.com f.fontdeck.com use.typekit.net connect.facebook.net maps.gstatic.com *.googleapis.com",
//        'font-src': "'self' data: use.typekit.net fonts.gstatic.com",
//        'connect-src': "'self' tct.local api.leedsinspired.co.uk",
//        'img-src': "'self' www.facebook.com p.typekit.net w.sharethis.com tct.local api.leedsinspired.co.uk *.cdninstagram.com *.googleapis.com maps.gstatic.com *.squarespace.com",
//        'style-src': "'self' 'unsafe-inline' hello.myfonts.net use.typekit.net *.googleapis.com",
//        'frame-src': "s-static.ak.facebook.com static.ak.facebook.com www.facebook.com"
//    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
