const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },

  devServer: {
    port: 8080
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                postcssImport(),
                postcssPresetEnv(/* pluginOptions */)
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
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
    })
  ]
};
