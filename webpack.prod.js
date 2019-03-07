const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const buildPath = path.resolve(__dirname, "dist");
const pages = require("./pages");

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
        test: /\.ejs$/,
        use: "ejs-compiled-loader"
      },
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

  // name title meta

  plugins: [
    new CleanWebpackPlugin({ buildPath }),
    ...pages.map(page => {
      return new HtmlWebpackPlugin({
        template: `./src/pages/${page.name}.ejs`,
        title: pages.title,
        inject: true,
        chunks: ["index"],
        filename: `${page.name}.html`
      });
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
