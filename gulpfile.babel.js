import Config from 'configstore';
import babel from 'gulp-babel';
import cache from 'gulp-cached';
import del from 'del';
import gulp from 'gulp';
import jest from 'gulp-jest';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import pkg from './package.json';

const paths = {
  scripts: 'src/**/*.js',
  tests: 'tests'
};

const config = {
  db: new Config(pkg.name)
};

const jestDefaults = {
  automock: false,
  collectCoverage: false,
  testEnvironment: 'node',
  testRegex: '\\.test\\.js$'
};

gulp.task('reset', function(done) {
  config.db.clear();
  process.stdout.write(`\n> Settings deleted from ${config.db.path}\n\n`);
  done();
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:informal', function() {
  return gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:watch', gulp.series('lint:informal', function(done) {
  gulp.watch(paths.scripts, gulp.series('lint:informal'));
  done();
}));

gulp.task('test', function() {
  const jestConfig = Object.assign({}, jestDefaults, { collectCoverage: false });

  return gulp.src(paths.tests)
    .pipe(jest({ config: jestConfig }));
});

gulp.task('test:coverage', function() {
  const jestConfig = Object.assign({}, jestDefaults, { collectCoverage: true });

  return gulp.src(paths.tests)
    .pipe(jest({ config: jestConfig }));
});

gulp.task('test:informal', function(done) {
  const jestConfig = Object.assign({}, jestDefaults);

  return gulp.src(paths.tests)
    .pipe(plumber(function (error) {
      util.log(`Error: ${error.message}`);
      done();
    }))
    .pipe(jest({ config: jestConfig }));
});

gulp.task('test:watch', gulp.series('test:informal', function(done) {
  gulp.watch([paths.scripts, paths.tests], gulp.series('test:informal'));
  done();
}));

gulp.task('build:clean', function(cb) {
  del([
    'lib/*',
  ], cb);
});

gulp.task('build:compile', function() {
  return gulp.src(paths.scripts)
    .pipe(cache('babel'))
    .pipe(babel())
    .pipe(gulp.dest('.'));
});

gulp.task('build:compile:informal', function() {
  return gulp.src(paths.scripts)
    .pipe(cache('babel'))
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('.'));
});

gulp.task('build', gulp.series(
  'lint', 'test:coverage', 'build:clean', 'build:compile'
));

gulp.task('build:informal', gulp.series(
  'lint:informal', 'test:informal', 'build:clean', 'build:compile:informal'
));

gulp.task('build:refresh', gulp.series(
  'lint', 'test', 'build:compile'
));

gulp.task('build:refresh:informal', gulp.series(
  'lint:informal', 'test:informal', 'build:compile'
));

gulp.task('build:watch', gulp.series('build:informal', function(done) {
  gulp.watch([paths.scripts, paths.tests], gulp.series('build:refresh:informal'));
  done();
}));

gulp.task('develop:load', gulp.series(
  'lint', 'test', 'build:clean', 'build:compile'
));

gulp.task('develop:reload', gulp.series(
  'lint', 'test', 'build:compile'
));

gulp.task('develop', gulp.series('develop:load', function(done) {
  nodemon({
    script: 'bin/wowser-pipeline',
    watch: ['src'],
    tasks: ['develop:reload'],
    delay: '250'
  });
  done();
}));

gulp.task('default', gulp.series('build'));
