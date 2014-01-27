// Provides instance of app object that has been extend with
// configuration object

define([
  'lodash',
  'backbone',
  'marionette'
],

function (_, Backbone, Marionette) {

  'use strict';

  var app = new Marionette.Application();

  app.on('initialize:before', function (options) {

    // load layout and start app module
    require(['components/vertebrae-layout/index']);
    require(['components/app/index']);

    // log to console in debug mode
    if (options.debug) {
      window.app = app;

      app.vent.on('all', function (evt) {
        console.log(evt);
      });
    }

  });

  // start router
  if (Backbone.history) {
    Backbone.history.start();
  }

  return app;

});

