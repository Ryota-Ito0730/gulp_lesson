import gulp from "gulp";

// Pugのコンパイル用プラグイン
import pug from "gulp-pug";
// SassをDartSassでコンパイル
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

// webpに変更せずに圧縮する場合は、下記を有効にします
import imagemin from "gulp-imagemin";
import optipng from "imagemin-pngquant";
import mozjpeg from "imagemin-mozjpeg";

//webpに変換します
// import webp from "gulp-webp";

/* Sass(SCSS)をコンパイルするタスク
 */
const compileSass = () => {
  return gulp.src("css/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("css"));
};

/**
 * Pugをコンパイルするタスク
 */
const compilePug = () => {
  return gulp.src("pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("pug"));
};

/**
 * 画像を圧縮します
 */
const convertImage = () => {
  return gulp.src("img/*.{jpg,jpeg,png}")
    .pipe(imagemin([
      mozjpeg({quality: 75, progressive: true}),
      optipng({optimizationLevel: 5}),
    ]))
    .pipe(gulp.dest("img/webp"))
};

// Webpに変換する場合は、上記タスクは無効化し、下記を有効化します
// const convertImage = () => {
// 	return gulp.src("img/*.{jpg,jpeg,png}")
//     .pipe(webp({quality: 50}))
// 		.pipe(gulp.dest("img/webp"))
// };

/**
 * 各ファイルを監視し、変更があったらSassやHTMLを変換するタスク
 */
const watchFiles = () => {
  gulp.watch("css/*.scss", gulp.series(compileSass));
  gulp.watch("pug/*.pug", gulp.series(compilePug));
  gulp.watch("img/*.{jpg,jpeg,png}", gulp.series(convertImage));
};

export default gulp.series(watchFiles);