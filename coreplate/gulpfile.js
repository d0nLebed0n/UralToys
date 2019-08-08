var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var panini = require('panini');
var prettify = require('gulp-html-prettify');
const imagemin = require('gulp-imagemin');

gulp.task('imgmin', () =>
  gulp.src('app/template/img/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 6}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('build/template/img/'))
);
gulp.task('sass', function() {
  gulp.src('app/template/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('app/template/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('observe-html', function () {
  return gulp.src('app/template/panini/pages/**/*.html')
    .pipe(panini({
      root:'app/template/panini/pages/',
      layouts: 'app/template/panini/layout/',
      partials: 'app/template/panini/sections/',
      helpers: 'app/template/panini/components/',
      data: 'app/template/panini/base/',
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.stream())
});
gulp.task('observe-html:reset', function (done) {
  panini.refresh();
  done();
})
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('fonts', function () {
  return gulp.src('app/template/fonts/*')
    .pipe(gulp.dest('build/template/fonts/'))
});
gulp.task('libs', function () {
  return gulp.src('app/template/libs/**')
    .pipe(gulp.dest('build/template/libs/'))
});
gulp.task('css', function () {
  return gulp.src('app/template/css/*')
    .pipe(gulp.dest('build/template/css/'))
});
gulp.task('js', function () {
  return gulp.src('app/template/js/**')
    .pipe(gulp.dest('build/template/js/'))
});
gulp.task('pages', function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('build/'))
});

gulp.task('watch', ['browser-sync', 'sass', 'observe-html'], function() {
  gulp.watch('app/template/sass/**/*.scss', ['sass']);
  gulp.watch('app/template/panini/pages/*.html', ['observe-html']);
  gulp.watch('app/template/panini/**/*', ['observe-html:reset', 'observe-html']);
  gulp.watch('app/template/js/**/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
});
gulp.task('build', [
  'sass',
  'pages',
  'imgmin',
  'fonts',
  'libs',
  'css',
  'js'
]);
gulp.task('default', ['watch']);
