// Karma configuration
// Generated on Thu May 15 2014 16:45:39 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'commonjs'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'node_modules/jquery/dist/jquery.js', watched: false, included: true },
      { pattern: 'node_modules/expect.js/expect.js', watched: false, included: true },
      { pattern: 'node_modules/sinon/pkg/sinon-1.8.2.js', watched: false, included: true },
      'tests/helpers/runner.js',

      'tests/app/helpers/namespace-spec.js',
    ],


    // list of files to exclude
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/app/**/*-spec.js': ['commonjs'],
      'tests/helpers/runner.js': ['commonjs']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    plugins: [
      'karma-PhantomJS-launcher',
      'karma-mocha',
      'karma-commonjs'
    ]
  });
};
