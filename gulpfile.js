const {src, dest, watch, series, parallel} = require('gulp');
const sass = require("gulp-sass")(require('sass'));
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename")

function scssToCss() {
    return src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCss({compatibility: 'ie8'}))
      .pipe(rename('custom.min.css'))
      .pipe(dest('dist/css'));
  }

function html() {
    return src('src/index.html')
      .pipe(dest('dist/'));
}
  
function images() {
    return src('src/img/*.*')
      .pipe(dest('dist/img'));
}

exports.default = function() {
    watch('src/sass/*.scss', scssToCss)
    watch('src/index.html', html);
    watch('src/img/*.*', images)
  }