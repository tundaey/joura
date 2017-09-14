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

export function listenToFeed(cb, errorCB){
    ref.child('questions').on('value', (snapshot)=> {
        const feed = snapshot.val() || {}
        const sortedIds = Object.keys(feed).sort((a,b)=> {
            return feed[b].timestamp - feed[a].timestamp
        })
        cb({feed, sortedIds})
    }, errorCB)
}

export function fetchUserLikes(uid){
    return ref.child(`userLikes/${uid}`).once('value')
        .then((snapshot) =>  snapshot.val() || {})
}

export function saveToUsersLikes(uid, questionId){
    return ref.child(`userLikes/${uid}/${questionId}`).set(true)
}

export function deleteFromUsersLikes(uid, questionId){
    return ref.child(`userLikes/${uid}/${questionId}`).set(null)
}

export function incrementNumberOfLikes(questionId){
    return ref.child(`likeCount/${questionId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOflIkes(questionId){
    return ref.child(`likeCount/${questionId}`)
    .transaction((currentValue =0) => currentValue - 1)
}

export function fetchUser(uid){
    return ref.child(`users/${uid}`).once('value')
    .then((snapshot)=> snapshot.val())
}

export function fetchUserQuestions(uid){
    return ref.child(`userQuestions/${uid}`).once('value')
    .then((snapshot)=> snapshot.val() || {})
}

export function fetchQuestion(questionId){
    return ref.child(`questions/${questionId}`).once('value')
    .then((snapshot)=> snapshot.val())
}

export function fetchLikeCount(questionId){
    return ref.child(`likeCount/${questionId}`).once('value')
    .then((snapshot)=> snapshot.val() || 0)
}

export function saveReply(questionId, reply){
    const replyId = ref.child(`replies/${questionId}`).push().key
    const replyWithId = {...reply, replyId}

    const replyPromise = ref.child(`replies/${questionId}/${replyId}`).set(replyWithId)

    return {
        replyWithId,
        replyPromise
    }
}

export function fetchReplies(questionId){
    return ref.child(`replies/${questionId}`).once('value')
    .then((snapshot)=> snapshot.val() || {} )
}