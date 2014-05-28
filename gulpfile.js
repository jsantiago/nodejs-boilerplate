// vim: set ft=javascript:

var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var uglify = require('gulp-uglify');

var pkg = require('./package.json');
var cacheBuster = pkg.version;

var paths = {
    scripts: [
        'bower_components/react/react.js',
        'bower_components/jquery/dist/jquery.js',
        'src/js/main.js'
    ],
    styles: [
        'bower_components/bootstrap/less/bootstrap.less',
        'bower_components/bootstrap/less/theme.less',
        'bower_components/font-awesome/less/font-awesome.less',
        'src/less/main.less'
    ],
    copy: [
        'src/**/*.txt'
    ]
};

gulp.task('clean', function(){
    return gulp.src('dist/**/*', {read: false})
        .pipe(clean());
});

gulp.task('scripts', function(){
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat(pkg.name+'-'+cacheBuster+'.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function(){
    return gulp.src(paths.styles)
        .pipe(less({compress:true}))
        .pipe(concat(pkg.name+'-'+cacheBuster+'.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-files', function(){
    return gulp.src(paths.copy)
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-fonts', function(){
    return gulp.src('bower_components/font-awesome/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy', ['copy-files', 'copy-fonts']);

gulp.task('watch', function(){
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.copy, ['copy']);
});

gulp.task('default', ['clean'], function(){
    gulp.start('scripts', 'styles', 'copy');
});
