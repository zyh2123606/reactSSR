const webpack = require('webpack'), 
    merge = require('webpack-merge'),
    common = require('./webpack.config.common.js'),
    os = require('os'),
    HappyPack = require('happypack'),
    happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin'),
    path = require('path'),
    { resolve } = path
const createHappyPlugin = (id, loaders) => new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool
});
require('dotenv').config()

module.exports = merge(common, {
    devtool: false,
    mode: 'production',
    entry: [
        path.resolve(__dirname, process.env.PRODUCT + '/App.js')
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: process.env.CONTENTBASE
    },
    resolve: {
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    plugins: [
        createHappyPlugin('happy-babel', [{
            loader: 'babel-loader',
            options: {
                babelrc: true,
                cacheDirectory: true // 启用缓存
            }
        }]),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, process.env.PRODUCT + '/index.ejs.tpl'),
            hash: true,
            minify: {
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            inject: 'body',
            chunksSortMode: 'auto',
            wxDebug: true,
            sourcePath: process.env.CONTENTBASE,
            preFix: '//app.yostom.com/api/vc',
            showErrors: true //错误信息写入页面
        }),
        new CleanWebpackPlugin(['*.js'], {
            root: path.resolve(__dirname, 'dist'),
            verbose: false, //将log写到 console.
            dry: false, //不要删除任何东西，主要用于测试.
            exclude: [] //排除不删除的目录，主要用于避免删除公用的文件
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, 'dll/vendor-manifest.json') 
        })
    ]
})