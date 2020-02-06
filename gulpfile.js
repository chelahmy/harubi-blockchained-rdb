const gulp          = require('gulp')
const connect       = require('gulp-connect-php')
const webpack       = require('webpack-stream')
const browserSync   = require('browser-sync').create()
const $             = require('gulp-load-plugins')()
const autoprefixer  = require('autoprefixer')

let copy_backend = () => {
	return gulp.src([
			'src/backend/**/*'
		])
		.pipe(gulp.dest('./dist/backend'))
}

const sassPaths = [
	'node_modules/foundation-sites/scss',
	'node_modules/motion-ui/src'
]

let sass = () => {
	return gulp.src('src/scss/app.scss')
		.pipe($.sass({
			includePaths: sassPaths,
			outputStyle: 'compressed' // if css compressed **file size**
		})
		.on('error', $.sass.logError))
		.pipe($.postcss([
			autoprefixer()
		]))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
}

let react = () => {
	return gulp.src('src/js/app.js')
		.pipe(webpack({
			output: {
				filename: 'bundle.js'
			},
			module: {
				rules: [{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env', '@babel/react']
					}
				}]
			},
			resolve: {
				extensions: ['.js', '.jsx']
			}
		}))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream())
}

let copy_statics = () => {
	return gulp.src([
			'src/*.html',
			'src/*.php',
			'src/**/img/*.*'
		])
		.pipe(gulp.dest('./dist'))
}

let copy_icons = () => {
	return gulp.src([
			'src/scss/foundation-icons/foundation-icons.{woff,ttf}'
		])
		.pipe(gulp.dest('./dist/css'))
}

let serve = () => {
	connect.server({
			base: './dist'
		}, function (){
		browserSync.init({
			//server: './dist'
			proxy: '127.0.0.1:8000'
		})
	})

	gulp.watch('src/backend/**/*', copy_backend)
	gulp.watch('src/scss/*.scss', sass).on('change', browserSync.reload)
	gulp.watch([
		'src/js/*.js', 
		'src/js/*.jsx', 
		'src/js/components/*.js', 
		'src/js/components/*.jsx'
		], react).on('change', browserSync.reload)
	gulp.watch(['src/*.html', 'src/*.php', 'src/img/*.*'], copy_statics).on('change', browserSync.reload)
}

gulp.task('copy-backend', copy_backend)
gulp.task('copy-statics', copy_statics)
gulp.task('copy-icons', copy_icons)
gulp.task('sass', sass)
gulp.task('react', react)
gulp.task('serve', gulp.series('copy-backend', 'copy-statics', 'copy-icons', 'sass', 'react', serve))
gulp.task('default', gulp.series('copy-backend', 'copy-statics', 'copy-icons', 'sass', 'react', serve))
