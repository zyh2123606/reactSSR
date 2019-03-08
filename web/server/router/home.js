import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import App from '../../client/app'
import Routes from '../../client/routes'
import Config from '../../utils/config'

const Home = async (ctx, next) => {
    const context = {};
    const _html = ReactDOMServer.renderToString(
        <StaticRouter
            location={ctx.originalUrl}
            context={context}>
            <App />
        </StaticRouter>
    );
    const match = Routes.some(route => matchPath(ctx.url, route))
    if(match){
        await ctx.render('index', {root: _html, title: '首页', desc: '这是首页', data: Config.encryptData({name: '李四', sex: '男'})})
    }
}

export default Home