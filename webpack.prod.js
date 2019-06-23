const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const buildPath = path.resolve(__dirname, "dist");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
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

  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.ejs$/,
        use: "ejs-compiled-loader"
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },

  // name title meta

  plugins: [
    new CleanWebpackPlugin({ buildPath }),
    new VueLoaderPlugin(),
    ...pages.map(page => {
      return new HtmlWebpackPlugin({
        template: `./src/pages/${page.name}.ejs`,
        title: page.title,
        inject: true,
        chunks: ["index"],
        filename: `${page.name}.html`,
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
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
