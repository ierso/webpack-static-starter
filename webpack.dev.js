const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const pages = require("./pages");

console.log(pages);

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
        test: /\.ejs$/,
        use: "ejs-compiled-loader"
      },
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
    ...pages.map(page => {
      return new HtmlWebpackPlugin({
        template: `./src/pages/${page.name}.ejs`,
        title: pages.title,
        inject: true,
        chunks: ["index"],
        filename: `${page.name}.html`
      });
    })
  ]
};
