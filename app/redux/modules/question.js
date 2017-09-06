import {saveQuestion} from 'helpers/api'
import {closeModal,removeSubmitting, submitQuestion} from './modal'
import {addSingleUsersQuestion} from './userQuestions'

const FETCHING_QUESTION = 'FETCHING_QUESTION'
const FETCHING_QUESTION_ERROR = 'FETCHING_QUESTION_ERROR'
const FETCHING_QUESTION_SUCCESS = 'FETCHING_QUESTION_SUCCESS'
const REMOVE_FETCHING_QUESTION = 'REMOVE_FETCHING_QUESTION'
const ADD_QUESTION = 'ADD_QUESTION'
const ADD_MULTIPLE_QUESTIONS = 'ADD_MULTIPLE_QUESTION'

export function fetchingQuestion(){
    return {
        type: FETCHING_QUESTION
    }
}

export function fetchingQuestionError(){
    return {
        type: FETCHING_QUESTION_ERROR,
        error: 'Error fetching question'
    }
}

export function fetchingQuestionSuccess(question){
    return {
        type: FETCHING_QUESTION_SUCCESS,
        question: question
    }
}

export function removeFetchingQuestion(){
    return {
        type: REMOVE_FETCHING_QUESTION
    }
}

export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

export function addMultipleQuestions(questions){
    return {
        type: ADD_MULTIPLE_QUESTIONS,
        question: questions
    }
}

export function questionFanout(question){
    return function(dispatch, getState){
        dispatch(submitQuestion())
        const uid = getState().user.authedId
        saveQuestion(question)
        .then((questionWithId)=> {
            dispatch(addQuestion(questionWithId))
            dispatch(closeModal())
            dispatch(addSingleUsersQuestion(uid, questionWithId.questionId))
            dispatch(removeSubmitting())
        }).catch((err)=> {
            console.warn('Error in question Fanout', err)
            dispatch(removeSubmitting())
        })
    }
}

const initialState = {
    isFetching: true,
    error: ''
}

export default function question(state =initialState, action){
    switch(action.type){
        case FETCHING_QUESTION:
            return {
                ...state,
                isFetching: true
            }
        case FETCHING_QUESTION_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case ADD_QUESTION:
        case FETCHING_QUESTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: '',
                [action.question.questionId] : action.question
            }
        case REMOVE_FETCHING_QUESTION:
            return {
                ...state,
                isFetching: false
            }
        case ADD_MULTIPLE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        default:
            return state
    }
}