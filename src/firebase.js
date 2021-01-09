import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCkcA3IgupFZZxVHOtCQAkgm55yMONI2OY",
    authDomain: "auth-development-265ec.firebaseapp.com",
    projectId: "auth-development-265ec",
    storageBucket: "auth-development-265ec.appspot.com",
    messagingSenderId: "710402439254",
    appId: "1:710402439254:web:dfa9ab46be69c80e3da3f7"
})

export const auth = app.auth()
export default app