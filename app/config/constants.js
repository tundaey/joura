import firebase from 'firebase'


// Initialize Firebase
const config = {
apiKey: "AIzaSyDBdTbjLenBanM4fwVj5027jGvGxfBHI9k",
authDomain: "joura-dd7a7.firebaseapp.com",
databaseURL: "https://joura-dd7a7.firebaseio.com",
projectId: "joura-dd7a7",
storageBucket: "joura-dd7a7.appspot.com",
messagingSenderId: "173305411437"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth
