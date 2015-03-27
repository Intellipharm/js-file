module.exports = {
    options: {
        stripBanners: true,
        sourceMap: false
    },
    'dist-js': {
    	dest: '<%= config.dist %>/js-file.js',
        src: [
            '<%= config.src %>/scripts/modernizr.js',
            '<%= config.src %>/scripts/js-file.js',
            '<%= config.src %>/scripts/js-file-settings.js',
            '<%= config.src %>/scripts/utils/file-util.js',
            '<%= config.src %>/scripts/models/workbook-model.js',
            '<%= config.src %>/scripts/models/worksheet-model.js',
            '<%= config.src %>/scripts/models/worksheet-cell-model.js',
            '<%= config.src %>/scripts/file-downloader/file-downloader.js',
            '<%= config.src %>/scripts/file-downloader/file-downloader-service.js',
            '<%= config.src %>/scripts/file-reader/file-reader.js',
            '<%= config.src %>/scripts/file-reader/file-reader-service.js'
        ]
    }
};