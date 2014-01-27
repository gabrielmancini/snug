define([
  'helpers/namespace',
  'marionette'
],

function (app, Marionette) {

  'use strict';

  return Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
    },

    index: function (id, data) {
      console.log('index route', id, data);
    }

  });

});

