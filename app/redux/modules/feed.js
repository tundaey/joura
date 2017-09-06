const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_QUESTION_ID_TO_FEED = 'ADD_NEW_QUESTION_ID_TO_FEED'
const RESET_NEW_QUESTIONS_AVAILABLE = 'RESET_NEW_QUESTIONS_AVAILABLE'

export function settingFeedListener(){
    return {
        type: SETTING_FEED_LISTENER
    }
}

export function settingFeedListenerError(error){
    return {
        type: SETTING_FEED_LISTENER_ERROR,
        error: 'Error Fetching feeds'
    }
}

export function settingFeedListenerSuccess(questionIds){
    return {
        type: SETTING_FEED_LISTENER_SUCCESS,
        questionIds
    }
}

export function addNewQuestionIdToFeed(questionId){
    return {
        type: ADD_NEW_QUESTION_ID_TO_FEED,
        questionId
    }
}

export function resetNewQuestionsAvailable(){
    return {
        type: RESET_NEW_QUESTIONS_AVAILABLE
    }
}

const initialState =  {
    newQuestionsAvailable: false,
    newQuestionsToAdd: [],
    isFetching: false,
    error: '',
    questionIds: []
}

export default function feed(state = initialState, action){
    switch(action.type){
        case SETTING_FEED_LISTENER:
            return {
                ...state,
                isFetching: true
            }
        case SETTING_FEED_LISTENER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case SETTING_FEED_LISTENER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: '',
                questionIds: action.questionIds,
                newQuestionsAvailable: false
            }
        case ADD_NEW_QUESTION_ID_TO_FEED:
            return {
                ...state,
                newQuestionsToAdd: [action.questionId, ...state.newQuestionsToAdd],
                newQuestionsAvailable: true
            }
        case RESET_NEW_QUESTIONS_AVAILABLE:
            return {
                ...state,
                questionIds: [...state.newQuestionsToAdd, ...state.questionIds],
                newQuestionsToAdd: [],
                newQuestionsAvailable: false
            }
        default:
            return state
    }
}