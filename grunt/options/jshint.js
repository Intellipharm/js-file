module.exports = {
    options: {
        curly: true, // don't allow non curly statements,
        eqeqeq: true,
        futurehostile: true,
        maxdepth: 4,
        notypeof: true,
        unused: true,
        "-W100": true,
        globals: {
            // js globals
            window: true,
            angular: true,
            _: true,
            console: true,
            XLSX: true,
            XLS: true,
            // grunt globals
            module: true,
            require: true,
            process: true
        }
    },
    lib: [
        '<%= config.src %>/scripts/**/*.js',
        '!<%= config.src %>/scripts/modernizr.js'
    ],
    tests: [
        '<%= config.tests %>/**/*.js'
    ],
    grunt: [
        'Gruntfile.js',
        '<%= config.grunt %>/**/*.js'
    ]
};
