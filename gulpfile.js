var SRC = 'src';
var ES5 = 'es5';
var WEB_APP = 'webapp';

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var bunyan = require('bunyan');
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
    pages: [SRC + '/*.html'],
    styles: [SRC + '/*.css'],
    scripts: [ES5 + '/*.js']
};

var makeBrowserFriendly = browserify({
    basedir: '.',
    debug: true,
    entries: [SRC + '/scripts/main.ts'],
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
            .pipe(gulp.dest(WEB_APP));
}

function transpile() {
    var tsProject = typeScript.createProject('src/tsconfig.json');
    return tsProject
            .src()
            .pipe(typeScript(tsProject))
            .js.pipe(gulp.dest(ES5));
}

function tslint() {
    gulp.src('./src/**/*.ts')
            .pipe(typeScriptLint({
                configuration: 'tslint.json',
                formatter: 'verbose'
            }))
            .pipe(typeScriptLint.report({
                emitError: false,
                summarizeFailureOutput: true
            }));
}

// gulp tasks --------------------------------------

gulp.task('clean', function (callback) {
    return del([ES5, WEB_APP], callback);
});

gulp.task('copy-html', function () {
    return gulp.src(uiPaths.pages)
            .pipe(gulp.dest(WEB_APP)); 
});

gulp.task('set-dev', development.task);

gulp.task('start-dev-api', ['tslint', 'transpile-api'], function () {
    var spawn = require('child_process').spawn;
    nodemon({
        env: {'NODE_ENV': 'development'},
        ext: 'css html js json sh ts',
        legacyWatch: true,
        readable: true,
        script: ES5 + '/app.js',
        stdout: true
    })
            .on('restart', function () {
                gulpUtil.log('---------- Restarted! ----------');
                tslint();
            });
});

gulp.task('transpile-ui', ['copy-html'], createClientUiBundle);

gulp.task('transpile-api', transpile);

gulp.task('tslint', tslint);

gulp.task('build-all', ['transpile-api', 'transpile-ui']);

gulp.task('clean-build', ['clean', 'build-all']);

gulp.task('default', ['build']);

gulp.task('watch-ui', function () {
    var watchedBrowserify = watchify(makeBrowserFriendly);
    watchedBrowserify.on('update', createClientUiBundle);
    watchedBrowserify.on('log', gulpUtil.log);
});
