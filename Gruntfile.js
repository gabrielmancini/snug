/*global module:false*/

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-karma');

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
      tasks: ['jshint', 'browserify'],
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
            hoodie: {
              path: 'www/lib/hoodie/index.js',
              exports: 'Hoodie'
            },
            jquery: {
              path: 'node_modules/jquery/dist/jquery.js',
              exports: '$'
            },
            lodash: {
              path: 'node_modules/lodash/dist/lodash.js',
              exports: '_'
            },
            underscore: {
              path: 'node_modules/lodash/dist/lodash.underscore.js',
              exports: '_'
            },
            backbone: {
              path: 'node_modules/backbone/backbone.js',
              exports: 'Backbone',
              depends: {
                underscore: 'underscore'
              }
            },
            'backbone.babysitter': {
              path: 'node_modules/backbone.marionette/node_modules/backbone.babysitter/lib/backbone.babysitter.js',
              exports: 'Backbone.Babysitter',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone.wreqr': {
              path: 'node_modules/backbone.marionette/node_modules/backbone.wreqr/lib/backbone.wreqr.js',
              exports: 'Backbone.Wreqr',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone.marionette': {
              path: 'node_modules/backbone.marionette/lib/backbone.marionette.js',
              exports: 'Marionette',
              depends: {
                jquery: '$',
                backbone: 'Backbone',
                underscore: '_'
              }
            },
            'backbone-hoodie': {
              path: 'node_modules/backbone-hoodie/src/backbone-hoodie.js',
              exports: 'Backbone.hoodie',
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
          debug: false,
          transform: [
            'hbsfy'
          ],
          alias: [
            './www/lib/hoodie/index.js:hoodie',
            './node_modules/jquery/dist/jquery.js:jquery',
            './node_modules/lodash/dist/lodash.js:lodash',
            './node_modules/lodash/dist/lodash.underscore.js:underscore',
            './node_modules/backbone/backbone.js:backbone',
            './node_modules/backbone.marionette/node_modules/backbone.babysitter/lib/backbone.babysitter.js:backbone.babysitter',
            './node_modules/backbone.marionette/node_modules/backbone.wreqr/lib/backbone.wreqr.js:backbone.wreqr',
            './node_modules/backbone.marionette/lib/backbone.marionette.js:backbone.marionette'

          ],
          external: [
            './www/lib/hoodie/index.js',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/lodash/dist/lodash.js',
            './node_modules/lodash/dist/lodash.underscore.js',
            './node_modules/backbone/backbone.js',
            './node_modules/backbone.marionette/node_modules/backbone.babysitter/lib/backbone.babysitter.js',
            './node_modules/backbone.marionette/node_modules/backbone.wreqr/lib/backbone.wreqr.js',
            './node_modules/backbone.marionette/lib/backbone.marionette.js'
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
          'www/dist/<%= pkg.name %>.min.js': ['www/dist/libs', 'www/dist/app.js']
        }
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },

      continuous: {
        singleRun: true,
        browsers: [
          'PhantomJS'
        ]
      },

      dev: {
        singleRun: true,
        browsers: [
          'PhantomJS'
        ]
      },

      coverage: {
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'app/**/*.js': ['coverage']
        },
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        }
      }
    },

  });

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'browserify:app', 'uglify']);
  grunt.registerTask('test', ['jshint', 'karma:dev']);

  grunt.registerTask('serve', [
    'hoodie',
    'connect:server',
    'configureProxies:server',
    'watch'
  ]);

};

