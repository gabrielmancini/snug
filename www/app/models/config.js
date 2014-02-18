var BaseModel = require('../helpers/mvc/model');

var Model = BaseModel.extend({

  // TODO: the below should be extended by appconfig
  defaults: {
    app: {
      name: 'appname',
      components: {
        'layout': {
          config: {
            template: null
          }
        },
        'sidebar': {
          config: {
            template: null
          }
        },
        'content': {
          config: { }
        }
      }
    },

    api: {
      url: 'http://localhost:6001/_api/'
    },

    ajax: {
      dataType: 'json',
      timeout: 10000,
      cache: true,
      async: true
    },

    debug: true
  }

});

module.exports = Model;
