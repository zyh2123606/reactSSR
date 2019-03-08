const webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    _PRODUCT_ = process.env.NODE_ENV == 'production',
    ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    them = require('./them'),
    path = require('path'),
    { resolve } = path
require('dotenv').config()

module.exports = {
    resolve: {
        alias: {},
        extensions: ['.web.js','.js', '.jsx', '.json']
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2
        },
        minimizer: [
            new ParallelUglifyPlugin({ // 多进程压缩
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        warnings: false,
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {test: /\.(le|c)ss$/,
                use: [{
                    loader: _PRODUCT_?MiniCssExtractPlugin.loader:'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'less-loader',
                    options: {
                        modifyVars: { ...them },
                        javascriptEnabled: true
                    }
                }]
            },
            {test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&outputPath=images/'
            },
            {test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'svg-sprite-loader'
            },
            {
                test: /\.ejs$/,
                exclude: /node_modules/,
                loader: 'ejs-loader'
            }
        ]
    }
}