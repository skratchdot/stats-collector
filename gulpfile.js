/*eslint strict: 0, no-console: 0 */
'use strict';

const childProcess = require('child_process');
const fs = require('fs');
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const isparta = require('isparta');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const rimraf = require('gulp-rimraf');
const sourcemaps = require('gulp-sourcemaps');
const files = {
  build: ['./src/**/*.js'],
  cover: ['./src/**/*.js', '!./src/cli.js'],
  clean: ['./lib'],
  lint: ['./src/**/*.js', './test/**/*.js', './gulpfile.js'],
  test: ['./test/**/*.js']
};

gulp.task('clean', function () {
  return gulp.src(files.clean)
    .pipe(rimraf());
});

gulp.task('readme', function (next) {
  childProcess.exec([
    'node',
    './scripts/readme.examples.js'
  ].join(' '), {}, function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    next();
  });
});

gulp.task('gh-pages', function (next) {
  childProcess.exec([
    './node_modules/.bin/esdoc',
    '-c',
    './esdoc.json'
  ].join(' '), { cwd: __dirname }, function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    next();
  });
});

gulp.task('build-helpers', function (next) {
  const build = function (srcDir, importPrefix, destFilename) {
    const names = [];
    let contents = '/* generated by gulpfile.js */\n/*eslint camelcase: 0 */';
    fs.readdirSync(srcDir).forEach(function (file) {
      const name = file.replace('.js', '');
      names.push(name);
      contents = `${contents}\nimport ${name} from '${importPrefix}${name}';`;
    });
    contents = `${contents}\nexport {\n  ${names.join(',\n  ')}\n};\n`;
    fs.writeFileSync(destFilename, contents, 'utf-8');
  };
  build('./src/collectors', '../collectors/', './src/helpers/collectors.js');
  build('./src/filters', '../filters/', './src/helpers/filters.js');
  return next;
});

gulp.task('transpile', function () {
  return gulp.src(files.build)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});

gulp.task('lint', function () {
	return gulp.src(files.lint)
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format('stylish'))
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});

gulp.task('test', function () {
  return gulp.src(files.cover)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      return gulp.src(files.test, {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({
          reporter: 'spec'
        }))
        .on('error', function (err) {
          console.error(err.toString());
          this.emit('end');
        })
        .pipe(istanbul.writeReports({
          dir: './coverage',
          reporters: ['lcov', 'json', 'text-summary']
        }));
    });
});

gulp.task('watch', function () {
  const watchFiles = [];
  Object.keys(files).forEach(function (key) {
    files[key].forEach(function (file) {
      if (watchFiles.indexOf(file) === -1) {
        watchFiles.push(file);
      }
    });
  });
  gulp.watch(watchFiles, ['build']);
});

gulp.task('build', ['build-helpers', 'lint', 'transpile', 'test']);
gulp.task('build-clean', ['clean', 'build']);
gulp.task('default', ['build', 'watch']);

// handle errors
process.on('uncaughtException', function (e) {
	console.error(e);
});
