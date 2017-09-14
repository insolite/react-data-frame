'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

var basePath = {
    src: 'examples/rich/styles',
    build: 'examples/rich/resources'
};

var path = {
    src: {
        style: basePath.src + '/scss/**/*.scss'
    },
    build: {
        css: basePath.build + '/css/'
    }
};

gulp.task('sass', function () {
  return gulp.src(path.src.style)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    // .pipe(cssmin())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('sass:watch', function () {
  gulp.watch(basePath.src + '/**/*.scss', ['sass']);
});
