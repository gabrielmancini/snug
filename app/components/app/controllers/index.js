define([
  'helpers/namespace',
  'marionette'
],

function (app, Marionette) {

  'use strict';

  return Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};

      // show app index module
      require(['components/index/index']);

    }

  });

});
