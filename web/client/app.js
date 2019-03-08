import React, { Component } from 'react'
import Routes from './routes'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

class App extends Component{
    render (){
        return (
            <Switch>
                {
                    Routes.map((route, idx) => (
                        <Route key={idx} {...route} />
                    ))
                }
            </Switch>
        )
    }   
}
export default App