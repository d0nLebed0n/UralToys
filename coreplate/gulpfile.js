const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const panini = require('panini');
const prettify = require('gulp-html-prettify');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
gulp.task('sass', () => {
	gulp.src('app/template/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(autoprefixer())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('app/template/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('observe-html', () => {
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
gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});
gulp.task('img', () => {
	return gulp.src('app/template/img/*')
		.pipe(gulp.dest('build/template/img/'))
});
gulp.task('fonts', () => {
	return gulp.src('app/template/fonts/*')
		.pipe(gulp.dest('build/template/fonts/'))
});
gulp.task('libs', () => {
	return gulp.src('app/template/libs/**')
		.pipe(gulp.dest('build/template/libs/'))
});
gulp.task('css', () => {
	return gulp.src('app/template/css/*')
		.pipe(gulp.dest('build/template/css/'))
});

gulp.task('js', () =>
  gulp.src('app/**/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('/template/js/bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/'))
);

gulp.task('pages', () => {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('build/'))
});

gulp.task('watch', ['browser-sync', 'sass', 'observe-html', 'js'], () => {
	gulp.watch('app/template/sass/**/*.scss', ['sass']);
	gulp.watch('app/template/panini/pages/*.html', ['observe-html']);
	gulp.watch('app/template/panini/**/*', ['observe-html:reset', 'observe-html']);
	gulp.watch('app/template/js/**/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});
gulp.task('build', [
	'sass',
	'pages',
	'img',
	'fonts',
	'libs',
	'css',
	'js'
]);
gulp.task('default', ['watch']);
