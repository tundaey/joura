import {ref} from 'config/constants'

function saveToQuestions(question){
    const questionId = ref.child('questions').push().key
    const questionPromise = ref.child(`questions/${questionId}`).set({...question, questionId});

    return {
        questionId,
        questionPromise
    }
}

function saveToUserQuestions(question, questionId){
    return ref.child(`userQuestions/${question.uid}/${questionId}`).set({...question, questionId})
}

function saveQuestionLikeCount(questionId){
    return ref.child(`questionLikeCount/${questionId}`).set(0)
}

export function saveQuestion(question){
    const {questionId, questionPromise} = saveToQuestions(question);
    return Promise.all([
        questionPromise,
        saveToUserQuestions(question, questionId),
        saveQuestionLikeCount(questionId)
    ]).then(()=> ({...question, questionId}))
}