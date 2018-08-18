const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const prettyData = require('gulp-pretty-data');
 
gulp.task('minify', function () {
  // 压缩wxml
  gulp.src('dist/**/*.wxml')
    .pipe(htmlmin({
        removeComments: true, // 清除wxml注释
        collapseWhitespace: true, // 压缩wxml
        removeEmptyAttributes: true // 删除所有空格作属性值 <input id="" /> ==> <input />
    }))
    .pipe(gulp.dest('dist'));
  
  // 压缩json、wxss、wxml
  gulp.src('dist/**/*.{json,xml,css}')
    .pipe(prettyData({
      type: 'minify',
      preserveComments: true,
      extensions: {
        'wxml': 'xml',
        'wxss': 'css'
      }
    }))
    .pipe(gulp.dest('dist'))

});