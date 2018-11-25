const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

const dest = 'public/gen';

gulp.task('js', () => {
  gulp
    .src('src/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest(dest));
});

gulp.task('sass', () => {
  gulp
    .src('src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(dest));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*', ['js', 'sass']);
});

gulp.task('all', () => {
  gulp.start('js');
  gulp.start('sass');
});
