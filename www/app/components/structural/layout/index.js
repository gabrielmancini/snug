/*jshint -W079 */
var Controller = require('./controllers/index');
var fs = require('fs');

var app = require('../../../helpers/namespace');

app.module('snug.layout', function () {

  'use strict';

  this.addInitializer(function (options) {
    options.app.components.layout.template = fs.readFileSync(__dirname + '/templates/index.html');

    this._controller = new Controller(
      options.app.components.layout
    );

  });

});

module.exports = app;
