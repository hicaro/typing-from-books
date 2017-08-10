"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import eslint from "gulp-eslint";
import vueify from "vueify";
import exorcist from "exorcist";
import watchify from "watchify";
import babelify from "babelify";
import uglify from "gulp-uglify";
import ifElse from "gulp-if-else";

// Input file
watchify.args.debug = true;
var bundler = browserify("public/js/src/index.js", watchify.args);

// Babel transform
bundler.transform(babelify);

// Vue transform
bundler.transform(vueify);

// On updates recompile
bundler.on('update', bundle);

function bundle() {
    return bundler.bundle()
        .on("error", function(error){
            console.error( '\nError: ', error.message, '\n');
            this.emit('end');
        })
        .pipe(exorcist('public/js/bundle.js.map'))
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
        .pipe(gulp.dest("public/js"));
}

gulp.task("default", ['transpile']);

gulp.task('transpile', ['lint'], () => bundle());

gulp.task('lint', () => {
    return gulp.src(['public/js/src/**/*.js', 'gulpfile.babel.js'])
      .pipe(eslint())
      .pipe(eslint.format());
});

gulp.task('watch', ['transpile'], () => {
  gulp.watch('public/js/src/**/*', ['transpile']);
});
