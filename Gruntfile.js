(function() {
    'use strict';

    module.exports = function (grunt) {

        // if this variable exists we have already set up grunt
        if (!grunt || !grunt.config || !grunt.config.data || !grunt.config.data.config || !grunt.config.data.config.dev) {

            // Load grunt modules from package.json automatically
            require('load-grunt-tasks')(grunt);

            // config variables, these are accessible like '<%= config.dev %>'
            var gruntConfig = {config: {
                // base folders
                dist: 'dist',
                src: 'src',
                tests: 'tests',
                grunt: 'grunt',
                pkg: grunt.file.readJSON('package.json')
            }};

            // loads tasks in the 'grunt' folder
            grunt.loadTasks('grunt');

            // loads task options in the 'grunt/options' folder
            //console.log(grunt.util._.extend(gruntConfig, gruntLoadConfig('./grunt/options/', grunt)));
            grunt.initConfig(grunt.util._.extend(gruntConfig, gruntLoadConfig('./grunt/options/', grunt)));
        }
    };

    function gruntLoadConfig(path, grunt) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/, '');
            object[key] = require(process.cwd() + path.replace('.', '') + option);
            if (typeof object[key] === 'function') {
                object[key] = object[key](grunt);
            }
        });

        return object;
    }
})();
