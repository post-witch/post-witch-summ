const {src, dest, watch} = require('gulp');
const sass = require("gulp-sass")(require('sass'));
const cleanCss = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat")
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const browserSync = require('browser-sync').create();

function scss_to_css() {
    return src('src/sass/*/*.scss')
      .pipe(sass({
        includePaths: ['./node_modules'],
      }).on('error', sass.logError))
      .pipe(concat('custom.min.css'))
      .pipe(cleanCss({compatibility: 'ie8'}))
      .pipe(browserSync.reload({
        stream: true
      }))
      .pipe(dest('dist/css'));
  }

function html() {
    return src('src/index.html')
      .pipe(htmlmin({collapseWhitespace:true}))
      .pipe(browserSync.reload({
        stream: true
      }))
      .pipe(dest('dist'));
}
  
function images() {
    return src('src/img/*.*')
      .pipe(imagemin())
      .pipe(dest('dist/img'))
      .pipe(webp())
      .pipe(dest('dist/img'));
}

function fonts() {
    return src('src/fonts/*.*')
      .pipe(dest('dist/fonts'));
}

exports.dev_mode = function() {
    browserSync.init({
      server: {
        baseDir: 'dist'
      },
    })
    watch('src/sass/*/*.scss', scss_to_css);
    watch('src/index.html', html);
    watch('src/img/*.*', images);
    watch('src/fonts/*.*', fonts);
  }