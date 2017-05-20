'use strict';

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var maps = require("gulp-sourcemaps");
var del = require("del");
var imagemin = require("gulp-imagemin");
var htmlmin = require('gulp-htmlmin');
var inlineSource = require("inline-source");
var gzip = require("gulp-gzip");

gulp.task("concatScripts", function() {
    return gulp.src(["js/jquery.js", "js/fastclick.js", "js/foundation.js", "js/foundation.equalizer.js", "js/foundation.reveal.js", "js/scripts.js", "sw.js"])
        .pipe(maps.init())
        .pipe(concat("app.js"))
        .pipe(maps.write("./"))
        .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"] , function() {
    return gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gzip())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("compileSass", function() {
    gulp.src("scss/application.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(gzip())
        .pipe(maps.write("./"))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("watchSass", function() {
    gulp.watch(["scss/**/*.scss"]);
});

gulp.task("image", function() {
    gulp.src('img')
        .pipe(imagemin())
        .pipe(gzip())
        .pipe(gulp.dest('dist/img'));
});

gulp.task("htmlMinify", function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/html'));
});

gulp.task("inlineSource", function() {
    return gulp.src("../index.html")
                .pipe(inlineSource())
                .pipe(gulp.dest("dist"));
});

gulp.task("clean", function() {
    del(["dist", "css/application.css*", "js/app*.js*"]);
});

gulp.task("build", ["minifyScripts", "compileSass", "htmlMinify"], function() {
    return gulp.src(["css/application.css", "js/app.min.js", "html/index.html", "./img/**"], { base: "./" })
                .pipe(gulp.dest("dist"));
});

gulp.task("default", ["clean", "build", "image", "inlineSource"], function() {
    gulp.start("build");
});