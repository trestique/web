var webpack = require("webpack");
var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var config = {
  module: {},
};
module.sorceEnable = false;

const returnAll = (watchFile) => {
  var allPages = Object.assign({}, config, {
    entry: {
      'simply': ['@babel/polyfill', './javascript/app.js'],
      'simply-collection': './javascript/collection-templates/collection-template.js',
      'simply-checkout': './javascript/checkout/app-checkout.js',
    },
    watch: watchFile,
    output: {
      path: __dirname,
      filename: "theme/assets/[name].js"
    },
    externals: {
      jquery: "jQuery",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: __dirname,
              },
            },
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "theme/assets/[name].css"
      }),
    ],
  });

  var reactApp = Object.assign({}, config, {
    context: __dirname,
    entry: ["@babel/polyfill", "./react/index.js"],
    watch: watchFile,
    output: {
      path: __dirname,
      filename: "theme/assets/simply-react.js",
    },
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '@blackcart/react-sdk': path.resolve(__dirname, 'node_modules', '@blackcart', 'react-sdk', 'dist', 'react-sdk.m.js'),
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
        },
        {
          test: /\.(png|j?g|svg|gif)?$/,
          use: "file-loader",
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: __dirname,
              },
            },
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
  });

  return [allPages, reactApp];
};
// Return Array of Configurations
module.exports = (env, argv) => {
  let watchFile = false;
  if (argv.mode === "development") {
    watchFile = true;
  }
  return returnAll(watchFile);
};
