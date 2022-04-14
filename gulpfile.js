
const {src, dest, watch} = require('gulp');
const sass = require("gulp-sass")(require('sass'));
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const browserSync = require('browser-sync').create();


function scss_to_css() {
    return src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCss({compatibility: 'ie8'}))
      .pipe(rename('custom.min.css'))
      .pipe(dest('dist/css'));
  }

function html() {
    return src('src/index.html')
      .pipe(htmlmin({collapseWhitespace:true}))
      .pipe(browserSync.reload({
        stream: true
      }))
      .pipe(dest('dist/'));
}
  
function images() {
    return src('src/img/*.*')
      .pipe(imagemin())
      .pipe(dest('dist/img'));
}

function fonts() {
    return src('src/fonts/*.*')
      .pipe(dest('dist/fonts'));
}

exports.default = function() {
    browserSync.init({
      server: {
        baseDir: 'dist'
      },
    })
    watch('src/sass/*.scss', scss_to_css);
    watch('src/index.html', html);
    watch('src/img/*.*', images);
    watch('src/fonts/*.*', fonts);
  }