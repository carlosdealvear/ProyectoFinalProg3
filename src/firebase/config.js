import firebase from 'firebase'
import app from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDckfERRTh2GEX-YPEALutS2f6BL0mpxkQ",
    authDomain: "proyecto-integrador-8a32b.firebaseapp.com",
    projectId: "proyecto-integrador-8a32b",
    storageBucket: "proyecto-integrador-8a32b.appspot.com",
    messagingSenderId: "818553403727",
    appId: "1:818553403727:web:38f9f30b045e36ab346d3a"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore()