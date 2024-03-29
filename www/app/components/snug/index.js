/*jshint -W079 */
var app = require('../../helpers/namespace');
var Controller = require('./controllers/index');

app.module('snug', function () {

  'use strict';

  this.addInitializer(function (options) {

    // boot up default UI components here:
    this._controller = new Controller(options);
  });

});

module.exports = app;

