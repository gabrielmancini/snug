'use strict';

var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return (/(.-spec|helper|app).js$/).test(file);
});

require.config({
  baseUrl:         '/base/app',
  paths: {
    jquery:        '../lib/jquery/jquery',
    text:          '../lib/requirejs-text/text',
    hbs:           '../lib/backbone.marionette.hbs/backbone.marionette.hbs',
    handlebars:    '../lib/handlebars/handlebars',
    lodash:        '../lib/lodash/dist/lodash',
    backbone:      '../lib/backbone/backbone',
    marionette:    '../lib/backbone.marionette/lib/backbone.marionette',
    rsvp:          '../lib/rsvp/rsvp.amd',
    helper:        '../tests/app/support/helper',
    fixtures:      '../tests/app/fixtures'
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

    'unique': {
      deps: ['backbone'],
      exports: 'Backbone.UniqueModel'
    },

    'handlebars': {
      exports: 'Handlebars'
    }
  },

  waitSeconds: 20,

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start

});

