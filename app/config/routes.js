import React from 'react' 
import PropTypes from 'prop-types'

//import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import {HomeContainer, MainContainer, AuthenticateContainer, 
    FeedContainer, LogoutContainer} from 'containers'

export default function getRoutes(checkAuth){
    return (
        <Router history={hashHistory}>
            <Router path="/" component={MainContainer}>
                <Route path="/feed" component={FeedContainer} onEnter={checkAuth}/>
                <Route path="/logout" component={LogoutContainer} />
                <IndexRoute component={HomeContainer} onEnter={checkAuth}/>
            </Router>
        </Router>
    )
}
