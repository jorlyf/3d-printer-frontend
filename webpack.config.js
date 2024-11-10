const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlPages = require("./src/pages.js");

module.exports = {
  mode: "development",
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  plugins: [
    ...htmlPages.map((htmlPage) => new HtmlWebpackPlugin({
      template: `./src/html/${htmlPage.name}.html`,
      filename: `${htmlPage.name}.html`,
    })),
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
