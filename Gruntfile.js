/*global module:false*/

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-exorcise');

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-hoodie');


  // Project configuration.
  grunt.initConfig({

    pkg: require('./package.json'),
    cfg: {},

    jshint: {
      files: [
        'Gruntfile.js',
        'www/app/**/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: [
        '<%= jshint.files %>',
        'www/app/**/*.html'
      ],
      tasks: ['jshint', 'browserify:app'],
      options: {
        livereload: true
      }
    },

    hoodie: {
      start: {
        options: {
          callback: function (config) {
            grunt.config.set('cfg', config);
          }
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'www',
          hostname: '0.0.0.0',
          middleware: function (connect, options) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            return [
              proxy,
              connect.static(options.base),
              connect.directory(options.base)
            ];
          }
        },
        proxies: [
          {
            context: '/_api',
            host: '<%= cfg.stack.www.host %>',
            port: '<%= cfg.stack.www.port %>'
          }

        ]
      }
    },

    browserify: {
      libs: {
        options: {
          shim: {
            jquery: {
              path: 'node_modules/jquery/dist/jquery.js',
              exports: '$'
            },
            lodash: {
              path: 'www/lib/lodash/dist/lodash.js',
              exports: '_'
            },
            underscore: {
              path: 'www/lib/underscore/underscore.js',
              exports: '_'
            },
            handlebars: {
              path: 'www/lib/handlebars/handlebars.js',
              exports: 'Handlebars'
            },
            backbone: {
              path: 'www/lib/backbone/backbone.js',
              exports: 'Backbone',
              depends: {
                underscore: 'underscore'
              }
            },
            'backbone.babysitter': {
              path: 'www/lib/backbone.babysitter/lib/backbone.babysitter.js',
              exports: 'Backbone.Babysitter',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone.wreqr': {
              path: 'www/lib/backbone.wreqr/lib/backbone.wreqr.js',
              exports: 'Backbone.Wreqr',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone.marionette': {
              path: 'www/lib/backbone.marionette/lib/backbone.marionette.js',
              exports: 'Marionette',
              depends: {
                jquery: '$',
                backbone: 'Backbone',
                underscore: '_'
              }
            },
            routeFilter: {
              path: 'www/lib/backbone.routefilter/index.js',
              exports: 'Backbone.Router',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone-hoodie': {
              path: './www/lib/backbone-hoodie/index.js',
              exports: 'Backbone.Hoodie',
              depends: {
                backbone: 'Backbone',
                hoodie: 'Hoodie'
              }
            }
          }
        },
        src: ['www/lib/*.js'],
        dest: 'www/dist/libs.js'
      },
      app: {
        options: {
          standalone: 'app',
          debug: true,
          transform: [
            'brfs'
          ],
          alias: [
            './node_modules/jquery/dist/jquery.js:jquery',
            './www/lib/lodash/dist/lodash.js:lodash',
            './www/lib/underscore/underscore.js:underscore',
            './www/lib/handlebars/handlebars.js:handlebars',
            './www/lib/backbone/backbone.js:backbone',
            './www/lib/backbone.babysitter/lib/backbone.babysitter.js:backbone.babysitter',
            './www/lib/backbone.wreqr/lib/backbone.wreqr.js:backbone.wreqr',
            './www/lib/backbone.marionette/lib/backbone.marionette.js:backbone.marionette',
            './www/lib/backbone.routefilter/index.js:routefilter',
            './www/lib/backbone-hoodie/index.js:backbone-hoodie'

          ],
          external: [
            './node_modules/jquery/dist/jquery.js',
            './www/lib/lodash/dist/lodash.js',
            './www/lib/underscore/underscore.js',
            './www/lib/handlebars/handlebars.js',
            './www/lib/backbone/backbone.js',
            './www/lib/backbone.babysitter/lib/backbone.babysitter.js',
            './www/lib/backbone.wreqr/lib/backbone.wreqr.js',
            './www/lib/backbone.marionette/lib/backbone.marionette.js',
            './www/lib/backbone.routefilter/index.js',
            './www/lib/backbone-hoodie/index.js'
          ]
        },
        src: ['www/app/init.js'],
        dest: 'www/dist/app.js',
      }
    },

    exorcise: {
      options: {
        bundleDest : 'www/dist/app.js'
      },
      files: {
        'www/dist/app.map': ['www/dist/app.js']
      },
    },

    uglify: {
      dist: {
        files: {
          'www/dist/<%= pkg.name %>.min.js': ['www/app/libs', 'www/app/app.js']
        }
      }
    },

  });

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'browserify', 'uglify']);

  grunt.registerTask('server', [
    'hoodie',
    'connect:server',
    'configureProxies:server',
    'watch'
  ]);

};

