const merge = require('webpack-merge'),
    webpack = require('webpack'),
    { resolve } = require('path'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    common = require('./webpack.config.common.js')
require('dotenv').config()

module.exports = merge(common, {
    entry: [
        path.resolve(__dirname, process.env.PRODUCT + '/client/index.js')
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    mode: 'development',
    devtool: false,
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500,
        poll: 1000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), //用户名替代id
        new webpack.NoEmitOnErrorsPlugin()
    ]
})