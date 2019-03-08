import router from 'koa-router'
const Router = new router()
import Home from './home'

//loading router page
Router.get('/home', Home)

export default Router