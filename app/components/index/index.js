define([
  'helpers/namespace',
  'marionette',
  './controllers/index'
],

function (app, Marionette, AppController) {

  'use strict';

  app.module('index', function () {

    // module lifecycle
    this.addInitializer(function (options) {
      var Router = Backbone.Marionette.AppRouter.extend({
        controller: new AppController(options),
       //"index" must be a method in AppRouter's controller
        appRoutes: {
          'index'                 : 'index',
          'index/:id'             : 'index',
          'index/:id/:action'     : 'index',
          ''                      : 'index'
        }
      });

      this.router = new Router();

    });

  });

});

