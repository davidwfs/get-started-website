const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglify-js-plugin');

module.exports = (env, argv) => {
  return {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: { discardComments: { removeAll: true } },
          canPrint: true
        })
      ]
    },
    entry: ['./assets/js/main.js', './assets/scss/main.scss'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(svg|png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'bundle.css'
      }),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
  }
}
