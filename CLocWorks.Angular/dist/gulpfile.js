var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var tslint = require('gulp-tslint');
var minify = require('gulp-minify');
var jspm = require('gulp-jspm-build');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('less', function () {
    return gulp.src('app/less/vizient.less') // Gets all files ending with .less in app/less and children dirs
        .pipe(less()) // Passes it through a gulp-less
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

// Watchers
gulp.task('watch', function () {
    gulp.watch('app/**/*.ts', ['jspm-bundle']);
    gulp.watch('app/**/*.less', ['less']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/**/*.js', browserSync.reload);
});

// Optimization Tasks 
// ------------------

// Bundling JavaScript files
gulp.task('jspm-bundle', function () {
    jspm({
        bundles: [{
            src: 'app/bootstrap',
            dst: 'build.js',
            options: { mangle: true, minify: true, sourceMaps: true }
        }],
        bundleSfx: true
    })
        .pipe(gulp.dest('./'));
});

// Optimizing Images 
gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('dist/images'));
});

//Gathering files/folders to copy
var foldersToMove = [
    './app/css/*.*',
    './app/fonts/*.*'
];
var filesToMove = [
    './*.js',    
    './*.js.*',
    './*.html',
    'node_modules/angular2/bundles/angular2-polyfills.min.js',
    'jspm_packages/system.js',
    'config.js'
];

// Copying files
gulp.task('copy', function () {
    gulp.src(foldersToMove, { base: "app" })
        .pipe(gulp.dest('dist'));
    return gulp.src(filesToMove, { base: "./" })
        .pipe(gulp.dest('dist'));
});

// Linting TS files 
gulp.task('tslint', function () {
    return gulp.src('app/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});


// Cleaning 
gulp.task('clean', function () {
    return del.sync('dist').then(function (cb) {
        return cache.clearAll(cb);
    });
});

gulp.task('clean:dist', function () {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function (callback) {
    runSequence(['less', 'browserSync', 'watch'],
        callback
    );
});

gulp.task('build', function (callback) {
    runSequence(
        'clean:dist',
        ['jspm-bundle', 'less', 'images', 'tslint'],
        'copy',
        callback
    );
});