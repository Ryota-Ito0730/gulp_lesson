import gulp from "gulp";
const {src, dest, watch, series} = gulp;

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
  return src("dev/scss/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(dest("dist/assets/css"));
};

/**
 * Pugをコンパイルするタスク
 */
const compilePug = () => {
  return src("dev/pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(dest("dist"));
};

/**
 * 画像を圧縮します
 */
const convertImage = () => {
  return src("dev/img/*.{jpg,jpeg,png}")
    .pipe(imagemin([
      mozjpeg({quality: 75, progressive: true}),
      optipng({optimizationLevel: 5}),
    ]))
    .pipe(dest("dist/assets/img"))
};

// Webpに変換する場合は、上記タスクは無効化し、下記を有効化します
// const convertImage = () => {
// 	return src("dev/img/*.{jpg,jpeg,png}")
//    .pipe(webp({quality: 50}))
// 		.pipe(dest("dist/assets/img/webp"))
// };

/**
 * 各ファイルを監視し、変更があったらSassやHTMLを変換するタスク
 */
const watchFiles = () => {
  watch("dev/scss/*.scss", series(compileSass));
  watch("dev/pug/*.pug", series(compilePug));
  watch("dev/img/*.{jpg,jpeg,png}", series(convertImage));
};

export default series(watchFiles);