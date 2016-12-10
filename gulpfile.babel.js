import Config from 'configstore';
import babel from 'gulp-babel';
import cache from 'gulp-cached';
import del from 'del';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import pkg from './package.json';
import plumber from 'gulp-plumber';

const config = {
  db: new Config(pkg.name),
  scripts: 'src/**/*.js',
  specs: 'spec/**/*.js'
};

gulp.task('reset', function(done) {
  config.db.clear();
  process.stdout.write(`\n> Settings deleted from ${config.db.path}\n\n`);
  done();
});

gulp.task('build:clean', function(cb) {
  del([
    'lib/*',
    'spec/*'
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

gulp.task('spec', function() {
  return gulp.src(config.specs, { read: false })
      .pipe(plumber())
      .pipe(mocha());
});

gulp.task('watch', function(done) {
  gulp.watch(config.scripts, gulp.series('build:compile', 'spec'));
  done();
});

gulp.task('default', gulp.series(
  'build', 'spec', 'watch'
));
