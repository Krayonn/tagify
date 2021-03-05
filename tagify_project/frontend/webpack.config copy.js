const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");

module.exports = {
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
        test: [/.css$/],
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== "production",
              reloadAll: true
            }
          },
          "css-loader"
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
      template: path.resolve(__dirname,'src/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new WebpackMd5Hash()
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
};
