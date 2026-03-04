const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    environment: {
      arrowFunction: false, // 不让 Webpack 输出箭头函数
      const: false, // 不让 Webpack 输出 const
      destructuring: false, // 不让 Webpack 输出解构语法
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
