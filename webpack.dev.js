const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
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
    new VueLoaderPlugin(),
    ...pages.map(page => {
      return new HtmlWebpackPlugin({
        template: `./src/pages/${page.name}.ejs`,
        title: page.title,
        inject: true,
        chunks: ["index"],
        filename: `${page.name}.html`
      });
    })
  ]
};
