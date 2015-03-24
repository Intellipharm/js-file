// Karma configuration
// Generated on Tue Jan 27 2015 07:58:14 GMT+1000 (EST)

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [

            // 3p dependencies
			'bower_components/lodash/lodash.min.js',
			'bower_components/js-xls/dist/xls.min.js',
			'bower_components/js-xlsx/dist/xlsx.full.min.js',

            // test data
            'tests-data/*.js',

            // src
			'src/scripts/utils/file-util.js',
			'src/scripts/models/workbook-model.js',
			'src/scripts/models/worksheet-model.js',
			'src/scripts/file-creator/file-creator-service.js',

            // tests
			'tests/**/*.js'
		],

		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
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
		browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false
	});
};
