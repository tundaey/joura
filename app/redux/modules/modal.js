
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const UPDATE_MODAL_QUESTION = 'UPDATE_MODAL_QUESTION'
const UPDATE_MODAL_DESCRIPTION = 'UPDATE_MODAL_DESCRIPTION'
const REMOVE_SUBMITTING = "REMOVE_SUBMITTING"
const SUBMIT_QUESTION = "SUBMIT_QUESTION"

export function openModal(){
    return {
        type: OPEN_MODAL
    }
}

export function closeModal(){
    return {
        type: CLOSE_MODAL
    }
}

export function updateModalQuestion(newQuestion){
    return {
        type: UPDATE_MODAL_QUESTION,
        newQuestion: newQuestion
    }
}

export function removeSubmitting(){
    return {
        type: REMOVE_SUBMITTING
    }
}

export function submitQuestion(){
    return {
        type: SUBMIT_QUESTION
    }
}

export function updateModalDescription(newDescription){
    return {
        type: UPDATE_MODAL_DESCRIPTION,
        newDescription: newDescription
    }
}

const initialState = {
    question: '',
    description: '',
    isSubmitting: false,
    isOpen: false
}

export default function Modal(state= initialState, action){
    switch(action.type){
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true
            }
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                duckText: ''
            }
        case SUBMIT_QUESTION:
            return {
                ...state,
                isSubmitting: true
            }
        case REMOVE_SUBMITTING:
            return {
                ...state,
                isSubmitting: false
            }
        case UPDATE_MODAL_QUESTION:
            return {
                ...state,
                question: action.newQuestion
            }
        case UPDATE_MODAL_DESCRIPTION:
            return {
                ...state,
                description: action.newDescription
            }
        default:
            return state
    }
}