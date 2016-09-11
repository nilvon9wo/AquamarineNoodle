var API_SRC = 'src/api';
var UI_SRC = 'src/ui';

var API_DIST = 'dist/api';
var UI_DIST = 'dist/ui';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var ts = require('gulp-typescript');
var tsify = require('tsify');

var uiPaths = {
    pages: [UI_SRC + '/*.html']
};

gulp.task('copy-html', function(){
    return gulp.src(uiPaths.pages)
            .pipe(gulp.dest(UI_DIST));
});

gulp.task('transpile-ui', ['copy-html'], function() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [UI_SRC + '/scripts/main.ts'],
        cache: {},
        packageCache: {}
    })
            .plugin(tsify)
            .bundle()
            .pipe(source('scripts/bundle.js'))
            .pipe(gulp.dest(UI_DIST));
});

gulp.task('transpile-api', function () {
    var tsProject = ts.createProject('src/api/tsconfig.json');

    return tsProject.src()
            .pipe(ts(tsProject))
            .js.pipe(gulp.dest(API_DIST));
});


gulp.task('default', ['transpile-api', 'transpile-ui']);
