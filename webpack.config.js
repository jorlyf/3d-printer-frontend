const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pages = require("./src/pages.js");

let entry = {}
for (const page of pages) {
  entry = {
    ...entry,
    [page.name]: [path.resolve(__dirname, "src", "pages", page.jsPath)],
  }
}

module.exports = {
  mode: "development",
  entry,
  output: {
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    ...pages.map((page) => new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "pages", page.htmlPath),
      filename: `${page.name}.html`,
      chunks: [page.name],
    })),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(
      {
        "process.env": JSON.stringify(dotenv.parsed),
        "process.env.MODE": JSON.stringify(process.env.MODE),
      }
    ),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: [".js"],
    alias: {
      "@common": path.resolve(__dirname, "src", "common"),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ["babel-loader"],
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    proxy: [
      {
        context: [dotenv.parsed.API_PATH_PREFIX],
        target: "http://localhost:8000",
      },
    ],
  },
}
