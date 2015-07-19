/// <binding BeforeBuild='clean, clean-ts, copy-html' AfterBuild='copy, compile-ts' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

/// <binding Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    fs = require("fs"),
    rename = require("gulp-rename"),
    Config = require('./Gulpfile.config');

eval("var project = " + fs.readFileSync("./project.json"));

var config = new Config(project ,fs);

gulp.task("clean", function (cb) {
    rimraf(config.libPath, cb);
});

gulp.task("copy", ["clean"], function () {
    var bower = {
        "bootstrap": "bootstrap/dist/**/*.{js,map,css,ttf,svg,woff,eot}",
        "angularjs": "angularjs/angular*.{js,map}",
        "angular-ui-router": "angular-ui-router/release/angular-ui-router*.{js,map}",
        "startbootstrap-sb-admin-2": "startbootstrap-sb-admin-2/dist/**/*.css",
        //"bootstrap-touch-carousel": "bootstrap-touch-carousel/dist/**/*.{js,css}",
        //"hammer.js": "hammer.js/hammer*.{js,map}",
        "jquery": "jquery/dist/*.{js,map}",
        "font-awesome": "font-awesome/**/*.{css,map,ttf,svg,woff,eot,woff2,otf}",
        //"jquery-validation": "jquery-validation/jquery.validate.js",
        //"jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js"
    }

    for (var destinationDir in bower) {
        gulp.src(config.bowerPath + bower[destinationDir])
          .pipe(gulp.dest(config.libPath + destinationDir));
    }
});

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], { read: false });
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions, //reference to library .d.ts files
                         config.appTypeScriptReferences];     //reference to app.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [config.tsOutputPath,            // path to generated JS files
                              config.sourceApp + '**/*.js',    // path to all JS files auto gen'd by editor
                              config.sourceApp + '**/*.js.map' // path to all sourcemap files auto gen'd by editor
    ];

    // delete the files
    del(typeScriptGenFiles, cb);
});

gulp.task('watch', function () {
    gulp.watch([config.allTypeScript], ['compile-ts', 'gen-ts-refs']);
});




gulp.task('copy-html', function () {

    gulp.src(config.allHtml)
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace("Components", "")
        }))
        .pipe(gulp.dest(
        function (file) {
            // var filePath = file.path;

            return config.allHtmlOutput;//  + filePath;
        }));

});

gulp.task('build-html', function () {
    var target = gulp.src(config.htmlCacheFile);
    var sources = gulp.src([config.allHtml]);
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath, file) {
            return file.contents.toString('utf8')
        }
    })).pipe(gulp.dest(config.tsOutputPath));
});