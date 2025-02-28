// gulpプラグインを読み込みます
import gulp from "gulp";

// SassやPugをコンパイルするプラグインを読み込みます
import *  as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import pug from "gulp-pug";

/**
 * Sass(SCSS)をコンパイルするタスクです
 */
const compileSass = () => {
  // cssフォルダ直下の全てのscssファイルを取得
  return gulp.src("css/*.scss")
    // Sassのコンパイルを実行
    .pipe(
      // コンパイル後のCSSを展開
      sass({
        outputStyle: "expanded"
      })
    )
    // cssフォルダー以下に保存
    .pipe(gulp.dest("css"));
}

/**
 * Pugをコンパイルするタスクです
 */
const compilePug = () => {
  // pugフォルダ直下の全てのPugファイルを取得
  return gulp.src("pug/*.pug")
    // コンパイルを実行
    .pipe(
      // コンパイル後のpugを展開
      pug({
          pretty: true
      })
    )
    // pugフォルダー以下に保存
    .pipe(gulp.dest("pug"));
}

/**
 * 各ファイルを監視し、変更があったらSassやHTMLを変換します
 */
const watchFiles = () => {
  gulp.watch("css/*.scss", compileSass)
  gulp.watch("pug/*.pug", compilePug)
}

// npx gulpというコマンドを実行後、watchFilesが実行されるようにします
export default gulp.series(watchFiles);