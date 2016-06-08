var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var tslint = require('gulp-tslint');
var minify = require('gulp-minify');
var glob = require('glob'); //not used
var browserify = require('browserify');
var source = require('vinyl-source-stream');


// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('scripts', function() {
	// Grabs the app.js file
    return browserify('app/js/main.js')
    	// bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('less', function() {
  return gulp.src('app/less/**/*.less') // Gets all files ending with .less in app/less and children dirs
    .pipe(less()) // Passes it through a gulp-less
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 

// gulp.task('scripts', function() {
//   return gulp.src('app/js/*.js')
//     .pipe(uglify())       
//     .pipe(gulp.dest('dist/js/'));
// });

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'));
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});


// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['less', 'browserSync', 'watch'],
    callback
  );
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['useref', 'less', 'images', 'fonts', 'tslint', 'scripts'],
    callback
  );
});