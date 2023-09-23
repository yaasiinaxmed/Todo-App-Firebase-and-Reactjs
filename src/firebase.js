import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDxo67cHW3SiSz7YMhl1eWGSfl_3TMftEk",
    authDomain: "todo-app-a53ec.firebaseapp.com",
    projectId: "todo-app-a53ec",
    storageBucket: "todo-app-a53ec.appspot.com",
    messagingSenderId: "624043004898",
    appId: "1:624043004898:web:b7224350409ca036175fbb",
    measurementId: "G-48GF3MGEXZ"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)