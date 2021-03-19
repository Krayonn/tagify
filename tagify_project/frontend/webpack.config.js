const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");

const isDevelopment = process.env.NODE_ENV === 'development'
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {

  const env = dotenv.config({ path: '../.env'}).parsed;
  // create a nice object from the env variable
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    console.log('ENVKEY', JSON.stringify(env[next]))
    return prev;
  }, {});

  console.log('ENV', envKeys);


  return {
    devtool: 'cheap-module-eval-source-map',
    entry: { app: "./src/index.js" },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
      publicPath: ""
    },
    module: {
      rules: [
        {
          test: /.(js|jsx)?$/,
          exclude: /(node_modules|bower_components|.html)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            }
          }
        },
        {
          test: /\.s?css$/,
          oneOf: [
            {
              test: /\.module\.s?css$/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      localIdentName: '[local]__[hash:base64:5]'
                    }
                  }
                },
                "sass-loader"
              ]
            },
            {
              use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "assets/images"
              }
            }
          ]
        },
        {
          test: /\.(woff2?|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                name: "fonts/[name].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html',
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        // filename: "[name].[contenthash].css",
        filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      }),
      new WebpackMd5Hash(),
      new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
      contentBase: path.resolve(__dirname, "src"),
      historyApiFallback: true,
      compress: true,
      port: 8080,
      watchContentBase: true,
      proxy: {
        "/api": "http://localhost:3000"
      }
    }
  }
}