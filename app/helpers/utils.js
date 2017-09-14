import moment from 'moment'

export function formatUserInfo(name, avatar, uid){
    return {
        name,
        avatar,
        uid
    }
}

export function formatQuestion(question, description, {name, avatar, uid}){
    return {
        question,
        description,
        name,
        avatar,
        uid,
        timestamp: Date.now()
    }
}

export function formatTimestamp(timestamp){
    return moment(timestamp).fromNow()
}

function getMilliSeconds(timestamp){
    return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleQuestions(timestamp){
    return getMilliSeconds(timestamp) > 100000
}

export function staleUser(timestamp){
    return getMilliSeconds(timestamp) > 100000
}

export function formatReply({name, uid, avatar},reply){
    return {
        name,
        reply,
        uid,
        avatar,
        timestamp: Date.now()
    }
}