var webpack = require('karma-webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-jquery', 'jasmine'],

    files: [
      'src/js/components/*.js',
      'src/*.scss',
      'tests/*spec.js'
    ],

    plugins: [
      webpack, 
      'karma-jasmine',
      'karma-jasmine-jquery',
      'karma-chrome-launcher',
      'karma-coverage'
    ],

    preprocessors: {
      'src/js/components/*.js': ['webpack', 'coverage'],
      'src/*.scss': ['webpack'],
      'tests/*spec.js': ['webpack']
    },

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'test-coverage/'
    },
    port: 9876,
    colors: false,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },
  });
}