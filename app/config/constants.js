import firebase from 'firebase'
import {config} from './firebase'



firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth
