import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter} from 'react-router-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { routerReducer } from 'react-router-redux'
import logger from 'redux-logger'
import * as Reducers from './reducers'
import App from './app'
import './base.less'
const reducer = combineReducers({
    ...Reducers,
    routing: routerReducer
});
const finalCreateStore = compose(applyMiddleware(thunkMiddleware, logger))(createStore)
const store = finalCreateStore(reducer)

const render = AppComponent =>{
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <AppComponent />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    )
}
render(App)

if(module.hot){
    module.hot.accept('./app.js', ()=>{
        const NextApp = require('./app.js').default
        render(NextApp)
    })
}