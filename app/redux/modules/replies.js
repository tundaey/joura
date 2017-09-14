import {saveReply, fetchReplies} from 'helpers/api'

const FETCHING_REPLIES = "FETCHING_REPLIES"
const FETCHING_REPLIES_ERROR = "FETCHING_REPLIES_ERROR"
const ADD_REPLY_ERROR = "ADD_REPLY_ERROR"
const ADD_REPLY = "ADD_REPLY"
const FETCHING_REPLIES_SUCCESS = "FETCHING_REPLIES_SUCCESS"
const REMOVE_REPLY = "REMOVE_REPLY"

export function fetchingReplies(){
    return {
        type: FETCHING_REPLIES
    }
}

export function fetchingRepliesError(error){
    console.log('replies error', error)
    return {
        type: FETCHING_REPLIES_ERROR,
        error: 'Error fetching Replies'
    }
}

export function fetchingRepliesSuccess(replies, questionId){
    return {
        type: FETCHING_REPLIES_SUCCESS,
        questionId,
        replies,
        lastUpdated: Date.now()
    }
}

export function addReply(reply, questionId){
    return {
        type: ADD_REPLY,
        reply,
        questionId
    }
}

export function addReplyError(error){
    return {
        type: ADD_REPLY_ERROR,
        error: 'Error adding Reply'
    }
}

export function removeReply(replyId, questionId){
    return {
        type: REMOVE_REPLY,
        replyId,
        questionId
    }
}

export function addAndHandleReply(questionId, reply){
    return function(dispatch){
        const { replyWithId, replyPromise } = saveReply(questionId, reply)
        dispatch(addReply(replyWithId, questionId))
        replyPromise.catch((error)=> {
            dispatch(removeReply(replyWithId.replyId, questionId))
            dispatch(addReplyError(error))
        })
    }
}

export function fetchAndHandleReplies(questionId){
    return function(dispatch){
        dispatch(fetchingReplies())

        fetchReplies(questionId)
        .then((replies)=> dispatch(fetchingRepliesSuccess(replies, questionId)))
        .catch((error)=> dispatch(fetchingRepliesError(error)))
    }
}

const initialReply = {
    name: '',
    reply: '',
    replyId: '',
    uid: '',
    timestamp: 0,
    avatar: ''
}


function questionReplies(state = initialReply, action){
    switch(action.type){
        case ADD_REPLY:
            return {
                ...state,
                [action.reply.replyId]: action.reply
            }
        case REMOVE_REPLY:
            return {
                ...state,
                [action.reply.replyId]: undefined
            }
        default:
            return state
    }
}

const initialQuestionState = {
    lastUpdated: Date.now(),
    replies: {}
}

function repliesAndLastUpdated(state = initialQuestionState, action){
    switch(action.type){
        case FETCHING_REPLIES_SUCCESS:
            return {
                ...state,
                lastUpdated: action.lastUpdated,
                replies: action.replies
            }

        case ADD_REPLY:
        case REMOVE_REPLY:
            return {
                ...state,
                replies: questionReplies(state.replies, action)
            }

        default:
            return state
    }
}

const initialState = {
    isFetching: false,
    error: ''
}

export default function replies(state = initialState, action){
    switch(action.type){
        case FETCHING_REPLIES:
            return {
                ...state,
                isFetching: true
            }

        case FETCHING_REPLIES_ERROR:
        case ADD_REPLY_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        
        case ADD_REPLY:
        case FETCHING_REPLIES_SUCCESS:
        case REMOVE_REPLY:
            return {
                ...state,
                isFetching: false,
                error: '',
                [action.questionId]: repliesAndLastUpdated(state[action.questionId], action)
            }

        default: 
            return state
    }
}