/*global module:false*/

var path = require('path');

module.exports = function (grunt) {

  'use strict';

  // custom tasks
  grunt.loadTasks('build/tasks/');

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-lintblame');

  grunt.loadNpmTasks('grunt-hapi');

  // Project configuration.
  grunt.initConfig({

    hapi: {
      custom_options: {
        options: {
          server: path.resolve('./server/server'),
          bases: {
            '/': './app',
            '/lib': './lib',
            '/assets': './assets'
          }
        }
      }
    },

    lintblame: {
      files: [
        'Gruntfile.js',
        'karma.conf.js',
        'app/**/*.js',
        'tests/**/*-spec.js',
        'tests/app/config.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= lintblame.files %>', 'assets/less/**/*.less', 'app/**/*.less', '!app/compiled/*'],
      tasks: ['lintblame', 'karma', 'hapi'],
      options: {
        livereload: true
      }
    },

    copy: {
      dist: {
        files: {
          'prod/app/index.html': 'app/index.html',
          'prod/': ['assets/images/*', 'assets/css/*']
        }
      }
    },

    //recess: {
      //white: {
        //options: {
          //compile: true,
          //compress: true
        //},
        //files: {
          //'assets/css/app.css' : ['assets/less/themes/app.less']
        //}
      //}
    //},

    requirejs: {
      production: {
        options: {
          almond: true,
          replaceRequireScript: [{
            files: ['prod/app/index.html'],
            module: 'main',
            modulePath: 'app/main'
          }],
          insertRequire: ['main'],
          baseUrl: 'app/',
          optimizeCss: 'none',
          optimize: 'uglify',
          uglify: {
            'beautify': false,
            'no-dead-code': true,
            'reserved-names': 'require'
          },
          inlineText: true,
          useStrict: true,
          findNestedDependencies: true,
          optimizeAllPluginResources: true,
          paths: {
            lib:           '../lib/',
            text:          '../lib/requirejs-text/text',
            hbs:           '../lib/backbone.marionette.hbs/backbone.marionette.hbs',
            jquery:        '../lib/jquery/jquery',
            handlebars:    '../lib/handlebars/handlebars',
            lodash:        '../lib/lodash/dist/lodash',
            backbone:      '../lib/backbone/backbone',
            marionette:    '../lib/backbone.marionette/lib/backbone.marionette'
          },

          shim: {
            'backbone': {
              deps: ['lodash', 'jquery'],
              exports: 'Backbone'
            },

            'marionette': {
              deps: ['backbone'],
              exports: 'Backbone.Marionette'
            },

            'handlebars': {
              exports: 'Handlebars'
            }

          },
          out: 'prod/app/main.js',
          name: 'main'
        }
      }
    },

    comment_builder: {
      options: {
        src: 'prod/app/index.html'
      }
    },

    karma: {
      'default': {
        configFile: 'karma.conf.js'
      }
    }

  });

  // Default task.
  grunt.registerTask('default', 'lintblame');

  grunt.registerTask('test', ['lintblame', 'karma']);
  grunt.registerTask('build', ['lintblame', 'karma', 'copy', 'requirejs', 'comment_builder']);
  grunt.registerTask('docs', 'groc');

  grunt.registerTask('server', [
    'hapi',
    'watch'
  ]);

};
