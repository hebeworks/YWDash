/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({

        /**
         * Load our packagone.json file
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Create data URIs in a CSS file for SVGs
         */
        grunticon: {
            nonembedsvg: {
                files: [{
                    expand: true,
                    cwd: 'public/assets/img/svg',
                    src: '*.svg',
                    dest: 'public/assets/img/svg'
                }],
                options: {
                    datasvgcss: '../../../../app/styles/components/_svg_icons.scss',
                    cssprefix: '@mixin svg--'
                }
            },
            embed: {
                files: [{
                    expand: true,
                    cwd: 'public/assets/img/svg/embed',
                    src: '*.svg',
                    dest: 'vendor/embedsvg'
                }],
                options: {
                    enhanceSVG: true,
                    cssprefix: '.svg-'
                }
            }
        }
    });

    /**
     * Generates a list of grunt tasks
     */
    require('load-grunt-tasks')(grunt);

    /**
     * Define a workflow of tasks that will be run on deployment
     */

    grunt.registerTask('svg', ['grunticon:embed', 'grunticon:nonembedsvg']);
};
