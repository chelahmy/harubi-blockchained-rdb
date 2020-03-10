const gulp          = require('gulp')
const connect       = require('gulp-connect-php')
const webpack       = require('webpack-stream')
const browserSync   = require('browser-sync').create()
const $             = require('gulp-load-plugins')()
const autoprefixer  = require('autoprefixer')

/*
Supporting Typescript modules:
1. Install Typescript preset for babel:
$ npm -i --save-dev @babel/preset-typescript
2. Webpack settings:
- module->rules->options->presets:['@babel/typescript']
- module->rules->tests: /\.(js|ts)x?$/
- resolve->extensions:['.ts', '.tsx', '.json']
3. Files to watch:
- '*.ts', '*.tsx', '*.json'
*/

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
					test: /\.(js|ts)x?$/,
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env', '@babel/react', '@babel/typescript']
					}
				}]
			},
			resolve: {
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
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
		'src/js/*.ts', 
		'src/js/*.tsx', 
		'src/js/*.json',
		'src/js/components/*.js', 
		'src/js/components/*.jsx',
		'src/js/components/*.ts', 
		'src/js/components/*.tsx',
		'src/js/components/*.json', 
		'src/js/utils/*.js', 
		'src/js/utils/*.jsx', 
		'src/js/utils/*.ts', 
		'src/js/utils/*.tsx', 
		'src/js/utils/*.json'
		], react) //.on('change', browserSync.reload)
	gulp.watch(['src/*.html', 'src/*.php', 'src/img/*.*'], copy_statics).on('change', browserSync.reload)
}

gulp.task('copy-backend', copy_backend)
gulp.task('copy-statics', copy_statics)
gulp.task('copy-icons', copy_icons)
gulp.task('sass', sass)
gulp.task('react', react)
gulp.task('serve', gulp.series('copy-backend', 'copy-statics', 'copy-icons', 'sass', 'react', serve))
gulp.task('default', gulp.series('copy-backend', 'copy-statics', 'copy-icons', 'sass', 'react', serve))
