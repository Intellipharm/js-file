module.exports = {
    options: {
        stripBanners: true,
        sourceMap: false
    },
    'dist-js': {
    	dest: '<%= config.dist %>/js-file-uploader-and-downloader.js',
        src: [
            '<%= config.src %>/scripts/js-file-uploader-and-downloader.js'
        ]
    }
};
