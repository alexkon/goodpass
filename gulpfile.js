var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');

gulp.task('css', function(){
    return gulp.src('public/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css'))
});

gulp.task('default', [ 'css' ]);
