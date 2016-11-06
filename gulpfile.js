'use strict';
var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    nodemon     = require('gulp-nodemon'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    cleancss    = require('gulp-clean-css'),
    pump        = require('pump');
/*
 * This package is used for restart node server every our server file changes
 * source: https://www.npmjs.com/package/nodemon
 */

gulp.task('nodemon', function() {
    nodemon({
        tasks: ['jshint'],
        script: 'server.js',
        ext: 'js html',
        ignore: ['node_modules/','public/bower_components','public/js','public/css'],
    })
    .on('restart', function () {
        console.log('restarted ...');
    });
});

/*
 * JSHint to lint all the js files
 */

gulp.task('jshint', ['app:uglify'], function () {
    gulp.src([
            './config/**/*.js',
            './config/*.js',
            './controllers/*.js',
            './models/*.js',
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

/*
* This task will minify all the css files
*/
gulp.task('site:cssmin', () => {
    gulp.src([
        './public/bower_components/angular-loading-bar/build/loading-bar.min.css',
        './public/bower_components/bootstrap/dist/css/bootstrap.min.css',
        './public/bower_components/dropzone/dist/min/dropzone.min.css',
        './public/bower_components/AngularJS-Toaster/toaster.min.css',
    ])
    .pipe(concat('site.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('./public/css/'));
});

/* concate togather all required Javascript library files */
gulp.task('site:uglify', function(cb) {
    pump([
        gulp.src([
            './public/bower_components/jquery/dist/jquery.min.js',
            './public/bower_components/angular/angular.min.js',
            './public/bower_components/angular-animate/angular-animate.min.js',
            './public/bower_components/AngularJS-Toaster/toaster.min.js',
            './public/bower_components/angular-route/angular-route.min.js',
            './public/bower_components/angular-loading-bar/build/loading-bar.min.js',
            './public/bower_components/angular-sanitize/angular-sanitize.min.js',
            './public/bower_components/angular-messages/angular-messages.js',
            './public/bower_components/angular-local-storage/dist/angular-local-storage.js',
            './public/bower_components/bootstrap/dist/js/bootstrap.min.js',
        ]),
        concat('site.min.js'),
        uglify(),
        gulp.dest('./public/js/')
    ],cb);

});

/*
* This task is will minify all the angular modules files
* @ front-end
*/

gulp.task('app:uglify', function(cb) {
    pump([
        gulp.src([
            './public/app/app.js',
            './public/app/factories/*.js',
            './public/app/directives/*.js',
            './public/app/controllers/*.js',
        ]),
        concat('app.min.js'),
        uglify(),
        gulp.dest('./public/js')
    ],cb);
});

gulp.task('default', ['nodemon', 'site:uglify', 'app:uglify', 'site:cssmin']);