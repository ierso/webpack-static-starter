const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const buildPath = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",

  devtool: "source-map",

  entry: {
    index: "./src/index.js"
  },

  output: {
    filename: "[name].[hash:6].js",
    path: buildPath
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [postcssImport(), postcssPresetEnv()]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin({ buildPath }),
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/about.html",
      inject: true,
      chunks: ["index"],
      filename: "about.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:6].css",
      chunkFilename: "[id].[contenthash:6].css"
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
};
