var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('dev/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/'));	
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
});

gulp.task('autoprefixer', () =>
    gulp.src('app/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/'))
);

gulp.task('watch', function () {
  gulp.watch('./dev/**/*.scss', ['sass']);
  gulp.watch('./app/**/*.html');
});


gulp.watch("app/**/*.*").on('change', browserSync.reload);
gulp.task('default',['sass','autoprefixer','serve','watch'])
