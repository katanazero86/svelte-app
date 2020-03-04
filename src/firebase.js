import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC9ZS44sNr0pwbO4KsonH97zMXGQdhKoBA",
    authDomain: "svelte-app-5ff01.firebaseapp.com",
    databaseURL: "https://svelte-app-5ff01.firebaseio.com",
    projectId: "svelte-app-5ff01",
    storageBucket: "svelte-app-5ff01.appspot.com",
    messagingSenderId: "420845045398",
    appId: "1:420845045398:web:3013b90d6d31b351b724b7",
    measurementId: "G-Z9RKZPST7Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const FIREBASE_DB = firebase.firestore();

