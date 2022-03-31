const {src, dest, watch} = require('gulp');
const {series, parallel} = require('gulp')
const sass = require("gulp-sass")(require('sass'));


function sassToCss() {
    return src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('dist/css/styles.css'));
  }

function html() {
    return src("src/index.html")
      .pipe(dest('dist/'))
}
  

  exports.default = function() {
    watch('src/sass/*.scss', sassToCss)
    watch('src/index.html', html)
  }