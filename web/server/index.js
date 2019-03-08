/**
 * Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。
 *
 * Babel的配置文件是.babelrc
 *  presets字段设定转码规则
 *  stage-0 包含了 stage-[1-3]
 * 如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。
 *
 * Babel默认只转换新的JavaScript句法（syntax）
 * 而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象.
 * 如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
 */
// require('css-modules-require-hook/preset')
// require('asset-require-hook')
require('@babel/polyfill')
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import'
  ]
})
require('./app.js')