"use strict";

import gulp from "gulp";
import concat from "gulp-concat";
import minifyCSS from "gulp-minify-css";
import autoprefixer from "gulp-autoprefixer";
import browserify from "browserify";
import envify from "envify";
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

// Envify transform
bundler.transform(envify);

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
  gulp.watch('public/css/*.css', ['css']);
});

gulp.task('css', () => {
  gulp.src('public/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('public/css/dist'));
});
