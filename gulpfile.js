
const {src, dest, watch} = require('gulp');
const sass = require("gulp-sass")(require('sass'));
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const browserSync = require('browser-sync').create();
const concat = require("gulp-concat");

function scss_to_css() {
    return src('src/sass/*/*.scss')
      .pipe(concat('custom.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(rename('custom.css'))
      .pipe(dest('src/css'));
  }

function html() {
    return src('src/index.html')
      //.pipe(htmlmin({collapseWhitespace:true}))
      .pipe(browserSync.reload({
        stream: true
      }))
      .pipe(dest('src'));
}
  
function images() {
    return src('src/img/*.*')
      .pipe(imagemin())
      .pipe(dest('src/img'))
      .pipe(webp())
      .pipe(dest('src/img'));
}

function fonts() {
    return src('src/fonts/*.*')
      .pipe(dest('dist/fonts'));
}

exports.dev_mode = function() {
    browserSync.init({
      server: {
        baseDir: 'src'
      },
    })
    watch('src/sass/*/*.scss', scss_to_css);
    watch('src/index.html', html);
    watch('src/img/*.*', images);
    watch('src/fonts/*.*', fonts);
  }