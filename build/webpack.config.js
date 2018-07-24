/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const development = 'development'

const env = process.env.NODE_ENV || development

const getPlugins = () => {
  const plugins = [
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, '../public') }]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunksSortMode: 'dependency',
      hash: false,
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
  ]

  if (env === development) {
    plugins.push(new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin())
  }
  return plugins
}

module.exports = {
  plugins: getPlugins(),
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['babel-loader', 'svg-react-loader'],
      },
    ],
  },
}
