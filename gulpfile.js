var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    path = require('path'),
    watch = require('gulp-watch');
 
gulp.task('default', function () {
    return gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  
})