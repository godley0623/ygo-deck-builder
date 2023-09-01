import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, /*getDocs,*/ query, where, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'

const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

const db = getFirestore()
const colRef = collection(db, 'decks')

export function getDecksByOwner(owner, setDecks) {
    const q = query(colRef, where('owner', '==', owner))
    onSnapshot(q, (snapshot) => {
        let decks = []
        snapshot.docs.forEach((doc) => {
            decks.push({ ...doc.data(), id: doc.id })
        })
        console.log(decks)
        setDecks(decks)
    })
}

export function addDeck(deckInfo) {
    addDoc(colRef, deckInfo)
}

export function deleteDeckByID(deckID) {
    const docRef = doc(db, 'decks', deckID)
    deleteDoc(docRef)
}

export function updateDeckByID(deckID, updateObj) {
    const docRef = doc(db, 'decks', deckID)
    updateDoc(docRef, updateObj)
}


// getDocs(q)
//     .then((snapshot) => {
//         console.log(snapshot.docs)
//     })

const auth = getAuth()
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
export default app