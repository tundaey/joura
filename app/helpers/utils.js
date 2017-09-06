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