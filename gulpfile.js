var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
//var pump = require('pump');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');
var concat = require('gulp-concat');

/**allow us to access data from the package json**/
var json = JSON.parse(fs.readFileSync('./package.json'));


/**Sass stuff**/

gulp.task('sass', function () {
  return gulp.src('./scss/app.scss')
   .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

/**end sass stuff**/


/**concat stuff**/
gulp.task('concat', function() {
  return gulp.src('js/app/global.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/'));
});

/**end concat stuff**/

/**uglifyjs stuff**/

gulp.task('uglify', function () {
  return gulp.src('dist/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/app.js'));
});

/**end uglifyjs stuff**/

/**browsersync stuff**/

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['concat'], function () {

    // Serve files from the root of this project
    browserSync.init(['css/*.css', 'js/**/*.js', 'index.html'], {
        server: {
            baseDir: "./"
        }
    });
});

/**end browsersync stuff**/


gulp.task('default', ['sass', 'concat', 'serve'], function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', ['concat']);
});


gulp.task('build', ['sass', 'concat', 'uglify'], function () {
  //nothing
});





