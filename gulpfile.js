const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('sass:watch', () => {
    gulp.watch('./assets/css/**/*.scss', gulp.parallel('sass'));
});

gulp.task('sass', () => (
    gulp.src('./assets/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./static/css'))
));