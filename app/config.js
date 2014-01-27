require.config({
  deps:            ['main'],
  paths: {
    text:          '/lib/requirejs-text/text',
    hbs:           '/lib/backbone.marionette.hbs/backbone.marionette.hbs',
    jquery:        '/lib/jquery/jquery',
    handlebars:    '/lib/handlebars/handlebars',
    lodash:        '/lib/lodash/dist/lodash',
    backbone:      '/lib/backbone/backbone',
    marionette:    '/lib/backbone.marionette/lib/backbone.marionette',
    rsvp:          '/lib/rsvp/rsvp.amd',
    hoodie:        '/lib/hoodie/dist/hoodie'
  },

  map: {
    '*': {
      'underscore': 'lodash'
    }
  },

  shim: {
    'backbone': {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    },

    'marionette': {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },

    'handlebars': {
      exports: 'Handlebars'
    }

  }

});

//
// requirejs error reporting
//
window.requirejs.onError = function (err) {
  'use strict';

  console.warn('require error: ', err.requireType);
  if (err.requireType === 'timeout') {
    console.warn('modules: ' + err.requireModules);
  }

  throw err;
};

