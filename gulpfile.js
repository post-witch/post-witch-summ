const {src, dest, watch} = require('gulp');
const sass = require("gulp-sass")(require('sass'));
const cleanCss = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat")
const clean = require("gulp-clean");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const browserSync = require('browser-sync').create();


function scss_to_css() {
    return src(['src/sass/page/page.scss', 'src/sass/*/*.scss'])
      .pipe(concat('custom.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(browserSync.reload({
        stream: true
      }))
      .pipe(dest('src/css'));
  }

function build_css(){
    return src('src/css/custom.css')
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(cleanCss({compatibility: 'ie8'}))
      .pipe(dest('dist/css'));
}

function html() {
    return src('src/index.html')
      .pipe(browserSync.reload({
        stream: true
      }));
}

function build_html() {
    return src('src/index.html')
      .pipe(htmlmin({collapseWhitespace:true}))
      .pipe(dest('dist'));
}

function to_avif() {
    return src('src/img/*.jpg')
      .pipe(avif({
        quality: 60,
      }))
      .pipe(dest('src/img'));
}

function to_webp() {
    return src('src/img/*.jpg')
      .pipe(webp())
      .pipe(dest('src/img'));
}

function images() {
    to_avif();
    to_webp();
}

function build_images() {
    return src('src/img/*.*')
      .pipe(imagemin())
      .pipe(dest('dist/img'));
}

function fonts() {
    return src('src/fonts/*.*')
      .pipe(browserSync.reload({
        stream: true
      }))
}

function build_fonts() {
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
    watch('src/img/*.jpg', images);
    watch('src/fonts/*.*', fonts);
  }

exports.build = function(done) {
    build_html();
    build_css();
    build_images();
    build_fonts();
    done();
}