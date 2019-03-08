import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import App from '../../client/app'
import Routes from '../../client/routes'

const createRender = async (ctx, next, data={title: '', desc: '', data: {}}) => {
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
        await ctx.render('index', {root: _html, ...data})
    }
}

export default {fn: createRender}