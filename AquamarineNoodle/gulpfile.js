var API_SRC = 'src/api';
var API_DIST = 'dist/api';
var UI_SRC = 'src/ui';
var UI_DIST = 'dist/ui';

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var del = require('del');
var environments = require('gulp-environments');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var sourceMaps = require('gulp-sourcemaps');
var typeScript = require('gulp-typescript');
var typeScriptify = require('tsify');
var typeScriptLint = require('gulp-tslint');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var development = environments.development;
var staging = environments.make('staging');
var production = environments.production;

var uiPaths = {
    pages: [UI_SRC + '/*.html']
};

var makeBrowserFriendly = browserify({
    basedir: '.',
    debug: true,
    entries: [UI_SRC + '/scripts/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(typeScriptify);

function createClientUiBundle() {
    return makeBrowserFriendly
            .transform('babelify')
            .bundle()
            .pipe(source('scripts/bundle.js'))
            .pipe(buffer())
            .pipe(sourceMaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourceMaps.write('./'))
            .pipe(gulp.dest(UI_DIST));
}

// gulp tasks --------------------------------------

gulp.task('clean', function (callback) {
    return del([API_DIST, UI_DIST], callback);
});

gulp.task('copy-html', function () {
    return gulp.src(uiPaths.pages)
            .pipe(gulp.dest(UI_DIST));
});

gulp.task('set-dev', development.task);

gulp.task('start-dev-api', ['tslint', 'transpile-api'], function () {
    nodemon({
        script: API_DIST + '/app.js',
        ext: 'css html js json sh ts',
        env: {'NODE_ENV': 'development'},
        tasks: ['tslint', 'transpile-api']
    });
});

gulp.task('transpile-ui', ['copy-html'], createClientUiBundle);

gulp.task('transpile-api', function () {
    var tsProject = typeScript.createProject('src/api/tsconfig.json');

    return tsProject
            .src()
            .pipe(typeScript(tsProject))
            .js.pipe(gulp.dest(API_DIST));
});

gulp.task('tslint', function () {
    gulp.src('./src/**/*.ts')
            .pipe(typeScriptLint({
                configuration: 'tslint.json',
                formatter: 'verbose'
            }))
            .pipe(typeScriptLint.report({
                emitError: false,
                summarizeFailureOutput: true
            }));
});

gulp.task('build-all', ['transpile-api', 'transpile-ui']);

gulp.task('clean-build', ['clean', 'build-all']);

gulp.task('default', ['build']);

gulp.task('watch', function () {
    var watchedBrowserify = watchify(makeBrowserFriendly);
    watchedBrowserify.on('update', createClientUiBundle);
    watchedBrowserify.on('log', gulpUtil.log);
});

