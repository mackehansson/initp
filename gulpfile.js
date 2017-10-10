'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: 'src',
        livereload: true
    });
});

gulp.task('workflow-css', function () {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/css/'))
        .pipe(connect.reload());
});

gulp.task('workflow-html', function () {
    gulp.src('./src/**/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.html'], ['workflow-html']);
    gulp.watch('./src/scss/**/*.scss', ['workflow-css']);
});

gulp.task('default', ['workflow-html', 'workflow-css', 'watch', 'connect']);