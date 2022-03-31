const {src,dest} = require('gulp');
const rename = require('gulp-rename');

function defaultTask(cb) {
    cb();
  }
  
  exports.default = defaultTask