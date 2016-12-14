import Config from 'configstore';
import babel from 'gulp-babel';
import cache from 'gulp-cached';
import del from 'del';
import gulp from 'gulp';
import jest from 'gulp-jest';
import nodemon from 'gulp-nodemon';
import pkg from './package.json';
import plumber from 'gulp-plumber';

const config = {
  db: new Config(pkg.name),
  scripts: 'src/**/*.js',
  tests: 'tests/**/*.js'
};

const jestDefaults = {
  rootDir: '.',
  automock: false,
  collectCoverage: false,
  testEnvironment: 'node'
};

gulp.task('reset', function(done) {
  config.db.clear();
  process.stdout.write(`\n> Settings deleted from ${config.db.path}\n\n`);
  done();
});

gulp.task('build:clean', function(cb) {
  del([
    'lib/*',
  ], cb);
});

gulp.task('build:compile', function() {
  return gulp.src(config.scripts)
    .pipe(cache('babel'))
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('.'));
});

gulp.task('build', gulp.series(
  'build:clean', 'build:compile'
));

gulp.task('test', function() {
  const jestConfig = Object.assign({}, jestDefaults, { collectCoverage: false });
  return gulp.src(config.tests).pipe(jest({ config: jestConfig }));
});

gulp.task('test:coverage', function() {
  const jestConfig = Object.assign({}, jestDefaults, { collectCoverage: true });
  return gulp.src(config.tests).pipe(jest({ config: jestConfig }));
});

gulp.task('watch', function(done) {
  gulp.watch(config.scripts, gulp.series('build:compile', 'test'));
  done();
});

gulp.task('start:dev', function(done) {
  nodemon({
    script: 'bin/wowser-pipeline',
    watch: ['src'],
    tasks: ['build:compile', 'test'],
  });
  done();
});

gulp.task('default', gulp.series(
  'build', 'test', 'watch'
));
