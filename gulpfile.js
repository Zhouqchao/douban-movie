var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

gulp.task('minifyCSS',function(){
	gulp.src('./dist/css/*.css')
        .pipe(autoprefixer({
        	browsers:['last 2 versions'],
        	cascade:false
        }))
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('default',['minifyCSS']);