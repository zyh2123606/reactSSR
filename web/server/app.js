import Koa from 'koa'
import cors from 'koa-cors'
import logger from 'koa-logger'
import session from 'koa-session'
import path from 'path'
import convert from 'koa-convert'
import webpack from 'webpack'
import config from '../../webpack.config.dev'
import webpackMiddleware from 'koa-webpack-middleware'
import views from 'koa-views'
import router from './router/controller'
import serve from 'koa-static'
import response from './dataFormart'

const App = new Koa(),
    devMiddleware = webpackMiddleware.devMiddleware,
    hotMiddleware = webpackMiddleware.hotMiddleware,
    compiler = webpack(config);

//step one koa application
App.use(views(path.resolve(__dirname, '../view'), {
  extension: 'ejs'
}))
/**session**/
const SESSION_CONFIG = {
    key: 'listenlite:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true
}
App.use(session(SESSION_CONFIG, App))
/**koa日记模块**/
App.use(logger())
/**跨域请求**/
App.use(cors())
App.use(response)
//step two load webpack-dev-middleware
App.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true
})))
//step three load webpack-hot-middle
App.use(convert(hotMiddleware(compiler)))
/**加载路由**/
App.use(router.routes(), router.allowedMethods())
App.listen(3000, ()=>console.log('server is runing at 3000'))