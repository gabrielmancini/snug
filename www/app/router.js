'use strict';

var BaseRouter = require('./helpers/mvc/router');

var Router = BaseRouter.extend({

  routes: {
    ''                    : 'snug',
    '*defaults'           : 'snug'
  },

  snug: function () {
    app.vent.trigger('snug');
  }

});

module.exports = Router;

