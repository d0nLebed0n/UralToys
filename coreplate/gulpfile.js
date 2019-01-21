var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var ts = require('gulp-typescript');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('sass', function() {
    gulp.src('app/template/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('app/template/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('typescript', function() {
    var tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });
    var tsResult = gulp.src("app/template/ts/**/*.ts")
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('app/template/js'));
});

gulp.task('browserify', function() {
    return browserify('./app/template/js/script.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/template/js'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browserify', 'browser-sync', 'sass'], function() {
    gulp.watch('app/template/sass/**/*.scss', ['sass']);
    gulp.watch('app/template/ts/**/*.ts', ['typescript']);
	gulp.watch('app/template/js/**/*.js', ['browserify']);
    gulp.watch('app/template/js/**/*.js', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
