const webpack = require('webpack'),
	Autoprefixer = require('autoprefixer'),
    postcssImport = require('postcss-import')
    pxTorem = require('postcss-px2rem')({remUnit: 34.5})
    plugins = [
        postcssImport({
          addDependencyTo: webpack //主要是解决@import引入样式不会自动加前缀的问题
        }),
        Autoprefixer
    ]
module.exports = { plugins }