const path = require("path");

module.exports = {
  // 처리하고 싶은 파일의 경로
  entry: "./src/client/js/main.js",
  mode: "development",
  output: {
    // 변환 결과물 파일 이름
    filename: "main.js",
    // 변환 결과물 경로
    path: path.resolve(__dirname, "assets", "js"),
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
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
