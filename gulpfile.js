// gulpプラグインを読み込みます
const { src, dest, watch } = require("gulp");

// SassやPugをコンパイルするプラグインを読み込みます
const sass = require("gulp-sass")(require('sass'));
const pug = require("gulp-pug");

/**
 * Sass(SCSS)をコンパイルするタスクです
 */
const compileSass = () => {
// cssフォルダ直下の全てのscssファイルを取得
return src("css/*.scss")
  // Sassのコンパイルを実行
  .pipe(
    // コンパイル後のCSSを展開
    sass({
      outputStyle: "expanded"
    })
  )
  // cssフォルダー以下に保存
  .pipe(dest("css"));
}

/**
 * Pugをコンパイルするタスクです
 */
const compilePug = () => {
// pugフォルダ直下の全てのPugファイルを取得
return src("pug/*.pug")
  // コンパイルを実行
  .pipe(
    // コンパイル後のpugを展開
    pug({
        pretty: true
    })
  )
  // pugフォルダー以下に保存
  .pipe(dest("pug"));
}

/**
 * 各ファイルを監視し、変更があったらSassやHTMLを変換します
 */
const watchFiles = () => {
  watch("css/*.scss", compileSass)
  watch("pug/*.pug", compilePug)   
}

// npx gulpというコマンドを実行後、watchFilesが実行されるようにします
exports.default = watchFiles;