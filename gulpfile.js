//Modules
var gulp      = require('gulp'),
    pug       = require('gulp-pug'),
    sass      = require('gulp-ruby-sass'),
    prefix    = require('gulp-autoprefixer'),
    uglify    = require('gulp-uglify'),
    tinypng   = require('gulp-tinypng-compress'),
    browserSync = require('browser-sync'),
    plumber   = require('gulp-plumber'),
    del       = require('del'),
    gutil     = require('gulp-util');

//Folders Paths
var src       = 'src/',
    build     = 'build/';

/************************
HTML, CSS, JS production
*************************/

//Json Files
var data = {
    //Pages
    "home"      : require('./' + src + 'data/home.json')
};

// Styles CSS - with sass & autoprefixer
gulp.task('styles', function(){
    return sass(src + 'assets/sass/main.scss', {
      style: 'compressed'})
      .pipe(plumber())
      .pipe(prefix(['last 15 versions', '> 1%']))
      .pipe(gulp.dest(src + '/assets/min/css/'));
});

// JS Uglifier
gulp.task('scripts', function (cb) {
    return gulp.src(src + 'assets/js/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(src + 'assets/min/js/'));
});

// Pug => HTML
gulp.task('pages', function buildHTML(){
    return gulp.src(src + 'pug/pages/**/*.pug')
    .pipe(plumber())
    .pipe(pug({
      locals: {
        "_data" : data
      }
    }))
    .pipe(gulp.dest(build))
})

// Pug => HTML with styles and scripts dependencies
gulp.task('website', ['styles', 'scripts'], function buildHTML(){
    return gulp.src(src + 'pug/pages/**/*.pug')
    .pipe(plumber())
    .pipe(pug({
      locals: {
        "_data" : data
      }
    }))
    .pipe(gulp.dest(build))
})

/************************
Images tasks
*************************/

//If you want to use TinyPNG, change key here:
var tinyKey = null;

if (tinyKey != null) {
      //Compress images with Tinypng
      gulp.task('tinypng', function () {
      	gulp.src(src + 'assets/img/**/*.{png,jpg,jpeg}')
      		.pipe(tinypng({
      			sigFile: 'images/.tinypng-sigs',
      			log: true,
            key: tinyKey
      		}))
      		.pipe(gulp.dest(src + 'assets/min/img/'));
      });

      //Final images task
      gulp.task('images', ['tinypng'], function() {
          gulp.src(src + 'assets/min/img/**/*')
          .pipe(gulp.dest(build + 'assets/images'));
      });

  } else {
      //Final images task
      gulp.task('images', function() {
          gulp.src(src + 'assets/img/**/*')
          .pipe(gulp.dest(build + 'assets/images'));
      });
}

/************************
browserSync
*************************/
gulp.task('browser-sync', ['website', 'images'], function() {
    browserSync.init({
        server: {
            baseDir: "./" + build
        }
    });
});

/************************
Other tasks
*************************/

//Delete task
gulp.task('del', function(done) {
  var minifiedFolder = src + 'assets/min/';
  del(build, done);
  del(minifiedFolder, done);
});

//Copy other static files
gulp.task('statics', function() {
   gulp.src(src + 'statics/**/*')
   .pipe(gulp.dest(build));
});

/************************
default and watch tasks
*************************/

//Watch task
gulp.task('watch', function() {
    gulp.watch(src + 'pug/**/*', ['pages', browserSync.reload]);
    gulp.watch(src + 'assets/sass/**/*', ['website', browserSync.reload]);
    gulp.watch(src + 'assets/js/**/*', ['website', browserSync.reload]);
    gulp.watch(src + 'assets/img/**/*', ['images']);
    gulp.watch(src + 'statics/**/*', ['statics']);
})

//Gulp main task
gulp.task('default', function() {
    gulp.start([
        'statics',
        'watch',
        'browser-sync'
    ]);
});
