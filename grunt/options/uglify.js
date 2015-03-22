module.exports = function (grunt) {
	return {
		'dist': {
			options: {
				sourceMap: true,
				preserveComments: 'some'
			},
			files: {
				'<%= config.dist %>/js-file-uploader-and-downloader.min.js': [
                    '<%= config.src %>/scripts/js-file-uploader-and-downloader.js'
				]
			}
		}
	};
};
