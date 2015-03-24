module.exports = function (grunt) {
	return {
		'dist': {
			options: {
				sourceMap: true,
				preserveComments: 'some'
			},
			files: {
				'<%= config.dist %>/js-file.min.js': [
                    '<%= config.src %>/scripts/utils/file-util.js',
                    '<%= config.src %>/scripts/models/workbook-model.js',
                    '<%= config.src %>/scripts/models/worksheet-model.js',
                    '<%= config.src %>/scripts/file-downloader/file-downloader-service.js'
				]
			}
		}
	};
};
