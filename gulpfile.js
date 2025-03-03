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
  return src("css/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(dest("css"));
};

/**
 * Pugをコンパイルするタスク
 */
const compilePug = () => {
  return src("pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(dest("pug"));
};

/**
 * 画像を圧縮します
 */
const convertImage = () => {
  return src("img/*.{jpg,jpeg,png}")
    .pipe(imagemin([
      mozjpeg({quality: 75, progressive: true}),
      optipng({optimizationLevel: 5}),
    ]))
    .pipe(dest("img/webp"))
};

// Webpに変換する場合は、上記タスクは無効化し、下記を有効化します
// const convertImage = () => {
// 	return src("img/*.{jpg,jpeg,png}")
//    .pipe(webp({quality: 50}))
// 		.pipe(dest("img/webp"))
// };

/**
 * 各ファイルを監視し、変更があったらSassやHTMLを変換するタスク
 */
const watchFiles = () => {
  watch("css/*.scss", series(compileSass));
  watch("pug/*.pug", series(compilePug));
  watch("img/*.{jpg,jpeg,png}", series(convertImage));
};

export default series(watchFiles);