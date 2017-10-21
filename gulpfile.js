const gulp = require("gulp");

// (S)CSS
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const minifycss = require("gulp-minify-css");

// JS
const uglify = require("gulp-uglify");

// Images
const imagemin = require("gulp-imagemin");

// BrowserSync
const browserSync = require("browser-sync").create();

// GH-pages
const ghPages = require("gulp-gh-pages");

gulp.task("deploy", () => {
  gulp.src("./dist/**/*")
    .pipe(ghPages());
});

gulp.task("sass", () => {
  return gulp.src("./scss/*.scss")
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

gulp.task("uglify", () => {
  return gulp.src("./js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
    // .pipe(browserSync.reload);
});

gulp.task("imagemin", () => {
  return gulp.src("./img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/img"))
    // .pipe(browserSync.reload);
});

gulp.task("index", () => {
  return gulp.src("./index.html")
    .pipe(gulp.dest("./dist"))
    // .pipe(browserSync.reload);
});

gulp.task("default", ["index", "sass", "uglify", "imagemin"], () => {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch("./index.html", ["index", browserSync.reload]);

  gulp.watch("./scss/*.scss", ["sass"]);

  gulp.watch("./js/*.js", ["uglify", browserSync.reload]);

  gulp.watch("./img/*", ["imagemin", browserSync.reload]);
});