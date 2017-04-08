let gulp = require('gulp')
let del = require('del')
let minifyHtml = require('gulp-minify-html')

gulp.task('htmls', () => {
  del.sync(['build/*'])

  return gulp.src([
    './content/images/details.html',
    './content/images/form.html',
    './content/images/invalid-data.html',
    './content/images/list.html',
    './content/index.html'
  ])
    .pipe(minifyHtml({empty: true}))
    .pipe(gulp.dest('build'))
})
