const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('pug', () => {
	return gulp.src('./src/views/index.pug')
		.pipe($.pug())
		.pipe(gulp.dest('./public'));
});

gulp.task('bundlejs', () => {
	return gulp.src([
		'./src/js/jquery-3.2.1.min.js',
		'./src/js/jquery-mouseable.min.js',
		'./src/js/utils.js',
		'./src/js/script.js'
	])
		.pipe($.concat('bundle.min.js'))
		.pipe($.babel())
		.pipe($.uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('sass', () => {
	return gulp.src('./src/sass/**/*.scss')
		.pipe($.sass({ outputStyle: 'compressed' }))
		.pipe($.rename('styles.min.css'))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('watch', ['build'], () => {
	gulp.watch('./src/**/*', () => {
		gulp.run('build');
	});
});

gulp.task('build', ['pug', 'bundlejs', 'sass']);