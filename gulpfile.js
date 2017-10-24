const gulp = require("gulp");

// (S)CSS
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const minifycss = require("gulp-minify-css");

// JS
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const concat = require("gulp-concat");

// Images
const imagemin = require("gulp-imagemin");

// BrowserSync
const browserSync = require("browser-sync").create();

// GH-pages
const ghPages = require("gulp-gh-pages");

// Plumber
const plumber = require("gulp-plumber");

// Cache
const cache = require("gulp-cached");

gulp.task("deploy", () => {
  return gulp.src("./dist/**/*")
    .pipe(plumber())
    .pipe(ghPages());
});

gulp.task("babel", () => {
  return gulp.src("./js/*.js")
    .pipe(plumber())
    .pipe(cache("babel"))
    .pipe(babel({
      presets: ["env"],
      comments: false,
      compact: true,
      minified: true
    }))
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("sass", () => {
  return gulp.src("./scss/*.scss")
    .pipe(plumber())
    .pipe(cache("sass"))
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(prefix({
      browsers: ["last 2 versions"]
    }))
    .pipe(minifycss())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("imagemin", () => {
  return gulp.src("./img/*")
    .pipe(plumber())
    .pipe(cache("img"))
    // .pipe(imagemin([
    //   imagemin.gifsicle({interlaced: true}),
    //   imagemin.jpegtran({progressive: true}),
    //   imagemin.optipng({optimizationLevel: 5})
    // ]))
    .pipe(gulp.dest("./dist/img"));
});

gulp.task("index", () => {
  return gulp.src("./index.html")
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["index", "sass", "babel", "imagemin"], () => {

  browserSync.init({
    server: "./dist",
    tunnel: true
  });

  gulp.watch("./index.html", ["index", browserSync.reload]);

  gulp.watch("./scss/*.scss", ["sass"]);

  gulp.watch("./js/*.js", ["babel", browserSync.reload]);

  // gulp.watch("./img/*.{png,gif,jpg}", ["imagemin"]);
});