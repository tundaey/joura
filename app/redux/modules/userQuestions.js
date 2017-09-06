const FETCHING_USERS_QUESTIONS = 'FETCHING_USERS_QUESTIONS'
const FETCHING_USERS_QUESTIONS_ERROR = 'FETCHING_USERS_QUESTIONS_ERROR'
const FETCHING_USERS_QUESTIONS_SUCCESS = 'FETCHING_USERS_QUESTIONS_SUCCESS'
const ADD_SINGLE_USERS_QUESTIONS = 'ADD_SINGLE_USERS_QUESTIONS'

export function fetchingUsersQuestions(uid){
    return {
        type: FETCHING_USERS_QUESTIONS,
        uid
    }
}

export function fetchingUsersQuestionsError(error){
    return {
        type: FETCHING_USERS_QUESTIONS_ERROR,
        error: 'Error fetching users Question Ids'
    }
}

export function fetchingUsersQuestionsSuccess(uid, questionIds, lastUpdated){
    return {
        type: FETCHING_USERS_QUESTIONS_SUCCESS,
        uid,
        questionIds,
        lastUpdated
    }
}

export function addSingleUsersQuestion(uid, questionId){
    return {
        type: ADD_SINGLE_USERS_QUESTIONS,
        uid,
        questionId
    }
}

const initialUserQuestionsState = {
    lastUpdated: 0,
    questionIds: []
}

function usersQuestion(state= initialState, action){
    switch(action.type){
        case ADD_SINGLE_USERS_QUESTIONS:
            return {
                ...state,
                questionIds : state.questionIds.concat([action.questionId])
            }
        
        default:
            return state
    }
}

const initialState = {
    isFetching: true,
    error: ''
} 

export default function usersQuestions(state = initialState, action){
    switch(action.type){
        case FETCHING_USERS_QUESTIONS:
            return {
                ...state,
                isFetching: true
            }
        case FETCHING_USERS_QUESTIONS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case FETCHING_USERS_QUESTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                [action.uid]: {
                    lastUpdated: action.lastUpdated,
                    duckIds: action.questionIds
                }
            }
        case ADD_SINGLE_USERS_QUESTIONS:
            return typeof state[action.uid] === 'undefined'
            ? state
            : {
                ...state,
                isFetching: false,
                error: '',
                [action.uid]: usersQuestion(state[action.uid], action)
            }
        default:
            return state
    }
}