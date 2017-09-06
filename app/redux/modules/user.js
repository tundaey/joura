import auth, {logout, saveUser} from 'helpers/auth';
import {formatUserInfo} from 'helpers/utils'

const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const FETCHING_USER = 'FETCHING_USER';
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER';

export function authUser(uid){
    return {
        type: AUTH_USER,
        uid
    }
}

export function unAuthUser(){
    return {
        type: UNAUTH_USER
    }
}

export function fetchingUser(){
    return {
        type: FETCHING_USER
    }
}

export function removeFetching(){
    return {
        type: REMOVE_FETCHING_USER
    }
}

export function fetchingUserFailure(){
    return {
        type: FETCHING_USER_FAILURE,
        error: 'Error fetching user'
    }
}

export function fetchingUserSuccess(user, uid, timestamp){
    return {
        type: 'FETCHING_USER_SUCCESS',
        uid,
        user,
        timestamp
    }
}

export function fetchAndHandleUser(){
    return function(dispatch){
        dispatch(fetchingUser())
        return auth().then(({user, credential})=> {
            console.log('user', user)
            const userData = user.providerData[0];
            const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid)
            return dispatch(fetchingUserSuccess(userInfo, user.uid, Date.now()))
        })
        .then(({user})=> saveUser(user))
        .then(()=> dispatch(authUser(user.uid)))
        .catch((error)=> {
            console.warn('error', error)
           dispatch(fetchingUserFailure())
        })
    }
}

export function logoutAndUnAuth(){
    return function(dispatch){
        logout();
        dispatch(unAuthUser())
    }
}

const initialUserState = {
    lastUpdated: 0,
    profile: {
        name: '',
        uid: '',
        avatar:''
    }
}

function user(state = initialUserState, action){
    switch(action.type){
        case FETCHING_USER_SUCCESS:
            return {
                ...state,
                profile: action.user,
                lastUpdated: action.timestamp
            }

        default:
            return state
    }
}

const initialState = {
    isFetching: true,
    error: '',
    isAuthed: false,
    authedId: ''
}

export default function users(state = initialState, action){
    switch(action.type){
        case AUTH_USER:
            return {
                ...state,
                isAuthed: true,
                authedId: action.uid
            }

        case UNAUTH_USER:
            return {
                ...state,
                isAuthed: false,
                authedId: ''
            }

        case FETCHING_USER:
            return {
                ...state,
                isFetching: true
            }

        case REMOVE_FETCHING_USER:
            return {
                ...state,
                isFetching: false
            }

        case FETCHING_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }

        case FETCHING_USER_SUCCESS:
            return action.user === null
            ?{
                ...state,
                error: '',
                isFetching: false
            }
            : {
                ...state,
                error: '',
                isFetching: false,
                error: '',
                [action.uid]: user(state[action.uid], action)
            }

        default:
            return state
    }
}