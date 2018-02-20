import MapView from './components/MapView'
import Feed from './components/Feed'
import Main from './components/Main'
import NotFound from './components/NotFound'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React from 'react'

export default ({children}) => (
    <BrowserRouter>
        <div>
            {children}
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/map" component={MapView}/>
                <Route path="/feed" component={Feed}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
)
