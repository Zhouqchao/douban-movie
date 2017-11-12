var gulp = require('gulp');
var cssnano = require('gulp-cssnano');

gulp.task('minifyCSS',function(){
	gulp.src('./dist/css/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('default',['minifyCSS']);