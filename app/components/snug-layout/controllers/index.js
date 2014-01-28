define([
  'helpers/namespace',
  'marionette',
  'lodash',
  'backbone'
],

function (app, Marionette, _, Backbone) {

  'use strict';

  var $ = Marionette.$;

  return Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
      this.layout = options.config.template || 'components/snug-layout/templates/index';

      // resolve or throw error
      this._addLayout().then(function () {
        app.vent.trigger('layout:ready');
      }, function (err) {
        throw new Error(err);
      });

    },

    _addLayout: function () {
      var dfd = $.Deferred();

      // require layout
      require(['hbs!' + this.layout], _.bind(function (layout) {

        try {

          // create layout object passing in a template string
          var Layout = Marionette.Layout.extend({
            template: layout
          });

          // assign a region to the documents container
          this.container = new Backbone.Marionette.Region({
            el: '#content'
          });

          // bind layout to container element
          this.container.show(new Layout());

          if (this.container instanceof Marionette.Region) {
            dfd.resolve();
          }

        } catch (err) {
          dfd.reject(err);
        }

      }, this));

      return dfd.promise();
    }

  });

});

