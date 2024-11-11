const path = require("path");
const webpack = require("webpack");
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
        "process.env.MODE": JSON.stringify(process.env.MODE),
      },
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
    port: 3000,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:8000",
      },
    ],
  },
}
