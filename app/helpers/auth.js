import {ref, firebaseAuth} from 'config/constants'
import firebase from 'firebase'

export default function auth(){
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebaseAuth().signInWithPopup(provider)
}

export function saveUser(user){
    return ref.child(`users/${user.uid}`).set(user)
    .then(()=> user)
}

export function checkIfAuthed(store){
    return store.getState().user.isAuthed
}

export function logout(){
    return firebaseAuth().signOut()
}