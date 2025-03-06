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

// 各タスクで指定するパスを読み込み
import pathObj from "./gulpfilePathConfig.js";

/* Sass(SCSS)をコンパイルするタスク
 */
const compileSass = () => {
  return src(pathObj.sass.dev)
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(dest(pathObj.sass.dist));
};

/**
 * Pugをコンパイルするタスク
 */
const compilePug = () => {
  return src(pathObj.pug.dev)
    .pipe(pug({ pretty: true }))
    .pipe(dest(pathObj.pug.dist));
};

/**
 * 画像を圧縮します
 */
const convertImage = () => {
  return src(pathObj.img.dev,{encoding: false})
    .pipe(imagemin([
      mozjpeg({quality: 75, progressive: true}),
      optipng({optimizationLevel: 5}),
    ]))
    .pipe(dest(pathObj.img.dist))
};

// Webpに変換する場合は、上記タスクは無効化し、下記を有効化します
// const convertImage = () => {
// 	return src(pathObj.img.dev,{encoding: false})
//     .pipe(webp({quality: 50}))
//     .pipe(dest(pathObj.img.distWebp))
// };

/**
 * 各ファイルを監視し、変更があったらSassやHTMLを変換するタスク
 */
const watchFiles = () => {
  watch(pathObj.sass.dev, series(compileSass));
  watch(pathObj.pug.dev, series(compilePug));
  watch(pathObj.img.dev, series(convertImage));
};

export default series(watchFiles);