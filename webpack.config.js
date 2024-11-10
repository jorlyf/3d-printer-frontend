const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/html/index.html",
      filename: "index.html",
    }),
    new HTMLWebpackPlugin({
      template: "./src/html/login.html",
      filename: "login.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(
      {
        "process.env.MODE": JSON.stringify(process.env.MODE),
      },
    ),
  ],
  resolve: {
    extensions: [".js"],
    alias: {
      "@public": path.resolve(__dirname, "public"),
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, "./src/js"),
      use: {
        loader: "babel-loader",
      },
    },
    {
      test: /\.(css|scss|module.scss)$/,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.(jpg|jpeg|png|svg)$/,
      use: ["file-loader"],
    },
    ],
  },
  devServer: {
    port: process.env.DEV_PORT,
    historyApiFallback: true,
  },
}
