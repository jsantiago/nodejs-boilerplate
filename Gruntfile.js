// vim: set ft=javascript:

'use strict';

module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cacheBuster: '<%= pkg.version %>',

        clean: {
            generated: ['dist/**/*'],
            dependencies: ['bower_components', 'node_modules']
        },

        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/fonts',
                        src: '*',
                        dest: 'dist/fonts'
                    }
                ]
            },
            ico: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '*.ico',
                        dest: 'dist'
                    }
                ]
            },
            txt: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '*.txt',
                        dest: 'dist'
                    }
                ]
            },
            xml: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '*.xml',
                        dest: 'dist'
                    }
                ]
            }
        },

        browserify: {
            options: {
                transform: [
                    require('grunt-react').browserify
                ]
            },
            app: {
                src: 'src/js/main.js',
                dest: 'src/js/generated.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd-HH:MM:ss") %> */\n'
            },
            build: {
                src: [
                    'bower_components/react/react.js',
                    'bower_components/jquery/jquery.js',
                    'src/js/generated.js'
                ],
                dest: 'dist/js/<%= pkg.name %>-<%= cacheBuster %>.min.js'
            }
        },

        less: {
            options: {
                yuicompress: true,
                compress: true
            },
            components: {
                files: {
                    'dist/css/<%= pkg.name %>-<%= cacheBuster %>.min.css': [
                        'bower_components/bootstrap/less/bootstrap.less',
                        'bower_components/bootstrap/less/theme.less',
                        'bower_components/font-awesome/less/font-awesome.less',
                        'src/less/main.less'
                    ]
                }
            }
        }

    });

    grunt.registerTask('default', ['clean:generated', 'browserify', 'uglify', 'less', 'copy']);

};
