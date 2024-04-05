const MiniCssExtractrPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  // 처리하고 싶은 파일의 경로
  entry: "./src/client/js/main.js",
  mode: "development",
  plugins: [
    new MiniCssExtractrPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    // 변환 결과물 파일 이름
    filename: "js/main.js",
    // 변환 결과물 경로
    path: path.resolve(__dirname, "assets"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
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
