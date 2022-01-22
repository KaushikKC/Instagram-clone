import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection
} from 'firebase/firestore'
import {
    getAuth
} from 'firebase/auth'

import {
    getStorage
} from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAzBtrhd-OSV_wCybPASZRG85oTTdEDEik",
    authDomain: "instagram-clone-react-ea269.firebaseapp.com",
    projectId: "instagram-clone-react-ea269",
    storageBucket: "instagram-clone-react-ea269.appspot.com",
    messagingSenderId: "845546803556",
    appId: "1:845546803556:web:d23ecdf0706e7d4e202a71",
    measurementId: "G-B6NXXCS6HB"
};


initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

// const ref = collection(db, 'posts')

export {db,auth,storage}
