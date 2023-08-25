import { initializeApp } from 'firebase/app'
import { query, where, onSnapshot } from 'firebase/firestore'
import { firebaseConfig, colRef } from '../firebase/firebaseConfig'
import { CardType } from '../types/cardType'
import { shuffleArray } from './controller'

initializeApp(firebaseConfig)

export function getRandomCards(amount: number) {
    const q = query(colRef)
    const cards:CardType[] = []
    const result:unknown[] = []

    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            const cardData = doc.data() as CardType;
            cards.push({ ...cardData })
        })

        console.log(cards.length)
        // for (let i=0; i<amount; i++) {
        //     let randomIndex = Math.floor(Math.random() * cards.length)
        //     result.push(cards[randomIndex]) 
        // }

        return result
    })
}

export function getCardsByArchetype(archetype: string) {
    const q = query(colRef, where("archetype", "==", archetype))
    const cards:CardType[] = []

    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            const cardData = doc.data() as CardType;
            cards.push({ ...cardData })
        })
    })

    return cards
}