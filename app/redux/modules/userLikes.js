import {
    fetchUserLikes, saveToUsersLikes, deleteFromUsersLikes, decrementNumberOflIkes,
    incrementNumberOfLikes} from 'helpers/api'

const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'
export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'

function fetchingLikes(){
    return {
        type: FETCHING_LIKES
    }
}

function fetchingLikesError(){
    return {
        type: FETCHING_LIKES_ERROR,
        error: 'Error fetching likes'
    }
}

function fetchingLikesSuccess(likes){
    return {
        type: FETCHING_LIKES_SUCCESS,
        likes
    }
}

function addLike(questionId){
    return {
        type: ADD_LIKE,
        questionId
    }
}

function removeLike(questionId){
    return {
        type: REMOVE_LIKE,
        questionId
    }
}

const initialState = {
    isFetching: false,
    error: ''
}

export function addAndHandleLike(questionId, e){
    e.stopPropagation()
    return function(dispatch, getState){
        dispatch(addLike(questionId))

        const uid = getState().user.authedId
        Promise.all([
            saveToUsersLikes(uid, questionId), 
            incrementNumberOfLikes(questionId)
        ]).catch((error) =>  {
            console.log(error)
            dispatch(removeLike(questionId))
        })
    }
}

export function handleDeleteLike(questionId, e){
    e.stopPropagation()
    return function(dispatch, getState){
        dispatch(removeLike(questionId))

        const uid = getState().user.authedId
        Promise.all([
            deleteFromUsersLikes(uid, questionId), 
            decrementNumberOflIkes(questionId)
        ]).catch((error) =>  {
            console.log(error)
            dispatch(addLike(questionId))
        })
    }
}

export function setUserLikes() {
    return function(dispatch, getState){
        const uid = getState().user.authedId

        dispatch(fetchingLikes())
        fetchUserLikes(uid)
        .then((likes) => dispatch(fetchingLikesSuccess(likes)))
        .catch((error)=> dispatch(fetchingLikesError(error)))
    }
}

export default function userLikes(state = initialState, action){
    const type = action.type
    switch(type){
        case FETCHING_LIKES:
            return {
                ...state,
                isFetching: true
            }
        case FETCHING_LIKES_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case FETCHING_LIKES_SUCCESS:
            return {
                ...state,
                ...action.likes,
                isFetching: false,
                error: ''
            }
        case ADD_LIKE:
            return {
                ...state,
                [action.questionId]: true
            }
        case REMOVE_LIKE:
            console.log('state', Object.keys(state))
            return Object.keys(state)
            .filter((questionId)=> action.questionId !== questionId)
            .reduce((prev, current)=> {
                console.log('prev', prev)
                console.log('current', current)
                prev[current] = state[current]
                return prev
            }, {})
        default:
            return state
    }
}