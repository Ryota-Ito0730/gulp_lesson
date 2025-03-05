/**
 * gulpfile.js内の各タスクで指定するパスを本ファイルに集約します
 * 注意:本ファイルはgulpfile.jsでのみ使用します
 * 
 * dev:開発中の参照先や監視先を指定します
 * dist:公開用ファイルの出力先を指定します
 */

const pathObj = {
  sass : {
    dev: "./dev/scss/*.scss",
    dist : "./dist/assets/css/"
  },
  pug : {
    dev: "./dev/pug/*.pug",
    dist : "./dist/"
  },
  img : {
    dev: "./dev/img/*.{jpg,jpeg,png}",
    dist : "./dist/assets/img/", // 拡張子の変更はしない場合に指定
    distWebp : "./dist/assets/img/webp" // WebPへ変換する場合に指定
  } 
}

export default pathObj;