module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './src/assets/css/main.css': './src/assets/scss/main.scss',
                    './src/assets/css/bootstrap.css': './src/assets/scss/bootstrap.scss',
                    './src/assets/css/fontawesome.css': './src/assets/scss/fontawesome.scss'
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
                    open: true,
                    watchTask: true
                }
            }
        },
        watch: {
            sass: {
                files: ['./src/**/*.scss'],
                tasks: ['sass']
            }
        },
        copy: {
            main: {
              expand: true,
              cwd: './node_modules/@fortawesome/fontawesome-free/webfonts/',
              src: '*',
              dest: './src/assets/webfonts',
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('server', ['copy', 'sass', 'php', 'browserSync', 'watch']);
}