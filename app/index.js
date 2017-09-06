import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import users from 'redux/modules/user'
import * as reducers from 'redux/modules'
import {checkIfAuthed} from 'helpers/auth'

import getRoutes from './config/routes'

const store = createStore(combineReducers(reducers), compose(
	applyMiddleware(thunk), 
    window.devToolsExtension? window.devToolsExtension() : (f) =>  f  // plugin for redux dev tools
    )
);

function checkAuth(nextState, replace){
    if(store.getState().user.isFetching){
        return
    }
    const isAuthed = checkIfAuthed(store);
    const nextPathName = nextState.location.pathname
    if(nextPathName === '/'){
        if(isAuthed === true){
            replace('/feed')
        }
    }else{
        if(isAuthed !== true){
            replace('/')
        }
    }
}

ReactDOM.render(
    <Provider store={store}>
        {getRoutes(checkAuth)}
    </Provider>, 
    document.getElementById('app')
)