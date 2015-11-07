var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    path = require('path');
 
gulp.task('default', function () {
    return gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 8 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  
})