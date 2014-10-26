module.exports = function (grunt) {

    var url = grunt.option('url') || 'http://localhost:3000';

    // Project configuration.
    grunt.initConfig({
        bowercopy: {
            options: {
                clean: true
            },
            js: {
                options: {
                    destPrefix: 'js/vendor'
                },
                files: {
                    'jquery.min.js': 'jquery/dist/jquery.min.js',
                    'jquery.min.map': 'jquery/dist/jquery.min.map',
                    'bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
                    'easeljs-0.7.1.min.js': 'easeljs/lib/easeljs-0.7.1.min.js'
                }
            },
            css: {
                options: {
                    destPrefix: 'css/vendor'
                },
                files: {
                    'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
                    'bootstrap.css.map': 'bootstrap/dist/css/bootstrap.css.map'
                }
            }
        },
        'string-replace': {
            dist: {
                files: {
                    './': ['index.html', 'js/ui.js']
                },
                options: {
                    replacements: [{
                        pattern: /http:\/\/\s*(.+?)\s*:3000/,
                        replacement: url
                    }]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('default', ['bowercopy', 'string-replace']);

};
