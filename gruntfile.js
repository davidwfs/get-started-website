module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './src/assets/css/main.css': './src/assets/scss/main.scss'
                }
            }
        },
        php: {
            dev: {
                options: {
                    port: 8000,
                    base: './src/'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['./src/**/*.{php,html}', './src/assets/**/*.{png,jpg,gif,svg,css,js}']
                },
                options: {
                    proxy: '127.0.0.1:8000',
                    port: 8000,
                    open: false,
                    watchTask: true
                }
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass']
            },
            php: {
                files: ['**/*.{php,html,css}']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('server', ['sass', 'php', 'browserSync', 'watch']);
}