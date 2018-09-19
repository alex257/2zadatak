const gulp         = require('gulp');
      browserSync  = require('browser-sync').create();
      sass         = require('gulp-sass');
      uglify       = require('gulp-uglify');
      autoprefixer = require('gulp-autoprefixer');
      uglifycss    = require('gulp-uglifycss');
      concat       = require('gulp-concat');
      sourcemaps   = require('gulp-sourcemaps');



// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
          }))
        .pipe(sass().on('error', sass.logError)) 
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into /src/js folder
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});


// Static Server + watching files
gulp.task('serve', function() {

    browserSync.init({
        server: "./dist"  
    });

    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/*.html', ['copyHtml']);

});

//Minify css 
gulp.task('minify-css', function () {
    return gulp.src('dist/css/*.css')
      .pipe(concat('main.css'))
      .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
      }))
      .pipe(gulp.dest('dist/css'));
});

//Concat scripts & uglify minify
gulp.task('scripts', ['js'], function(){
    return gulp.src('src/js/*.js')
         .pipe(sourcemaps.init())
         .pipe(concat('main.js'))
         .pipe(uglify())
         .pipe(sourcemaps.write('./'))
         .pipe(gulp.dest('dist/js'));
   });
 
 // Copy All HTML files
 gulp.task('copyHtml', function(){
     gulp.src('src/*.html')
         .pipe(gulp.dest('dist'));
 });

gulp.task('default', ['sass','js','serve','minify-css','scripts','copyHtml']);