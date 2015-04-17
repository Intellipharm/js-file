module.exports = function(grunt) {
    grunt.registerTask('build', [
        'notify:build',
        'jshint',
        'jscs',
        'karma:build',
        'clean:dist',
        'concat:dist-js',
        'uglify:dist',
        'notify:buildComplete'
    ]);
};
