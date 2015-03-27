module.exports = function (grunt) {
	return {
		'dist': {
			options: {
				sourceMap: true,
				preserveComments: 'some'
			},
			files: {
				'<%= config.dist %>/js-file.min.js': [
                    '<%= config.dist %>/js-file.js'
				]
			}
		}
	};
};git 