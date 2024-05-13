const MiniCssExtractrPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js";

module.exports = {
  entry: {
    // 처리하고 싶은 파일의 경로
    main: BASE_JS + "/main.js",
    videoPlayer: BASE_JS + "/videoPlayer.js",
    recorder: BASE_JS + "/recorder.js",
    commentSection: BASE_JS + "/commentSection.js",
  },
  mode: "development",
  watch: true, // entry의 파일이 수정되면 자동으로 webpack이 재실행됨
  plugins: [
    new MiniCssExtractrPlugin({
      filename: "css/styles.css", // 추출한 css 파일 이름
    }),
  ],
  output: {
    clean: true, // 내보내기 전에 output 디렉토리 정리
    filename: "js/[name].js", // 변환한 파일 이름
    path: path.resolve(__dirname, "assets"), // 변환한 파일 경로
  },
  module: {
    rules: [
      // js 변환 규칙
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      // scss 변환 규칙
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractrPlugin.loader, // css를 추출해서 별도의 파일로 만들어줌
          "css-loader", //
          "sass-loader", // scss를 css로 변환
        ],
      },
    ],
  },
};
