'use strict';

require('backbone-async-route-filter');

var BaseRouter = Backbone.Router.extend({

  before: {
    '*any': function (fragment, args, next) {
      next();
    }
  },

  after: {
    '*any': function (fragment, args, next) {
      next();
    }
  }

});

module.exports = BaseRouter;

