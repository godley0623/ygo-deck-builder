import cardDB from '../data/cardDB.json'
import { CardType } from '../types/cardType'

export function getRandomCards(amount: number): CardType[] {
    const randomCards: CardType[] = []
    const cards = cardDB as []

    const chosenIndex: number[] = []
    while (randomCards.length < amount) {
        let randomIndex = Math.floor(Math.random() * cards.length)
        let copyFound = false;
        for (let i=0; i<chosenIndex.length; i++) {
            if (randomIndex === chosenIndex[i]) copyFound = true
        }

        if (!copyFound) {
            chosenIndex.push(randomIndex)
            randomCards.push(cards[randomIndex])
        }
    }

    return randomCards
}

export function getCardsByName(name: string, cards:CardType[] = []):CardType[] {
    if (!cards.length) cards = cardDB as CardType[]
    const cardResult: CardType[] = []

    for (let i=0; i<cards.length; i++) {
        if (cards[i].name.toLowerCase() === name.toLowerCase()) {
            cardResult.push(cards[i])
        }
    }

    return cardResult
}

export function getCardsByArchetype(archetype: string, cards:CardType[] = []):CardType[] {
    if (!cards.length) cards = cardDB as CardType[]
    const cardResult: CardType[] = []

    for (let i=0; i<cards.length; i++) {
        if (cards[i].archetype.toLowerCase() === archetype.toLowerCase()) {
            cardResult.push(cards[i])
        }
    }

    return cardResult
}

export function getCardsBySubString(str: string, cards:CardType[] = []):CardType[] {
    if (!cards.length) cards = cardDB as CardType[]
    const cardResult: CardType[] = []

    for (let i=0; i<cards.length; i++) {
        if ( cards[i].name.toLowerCase().includes(str.toLowerCase()) ) {
            cardResult.push(cards[i])
        }
    }

    return cardResult
}

export function getCardsByFrameType(frame_type: string, cards:CardType[] = []):CardType[] {
    if (!cards.length) cards = cardDB as CardType[]
    const cardResult: CardType[] = []

    for (let i=0; i<cards.length; i++) {
        if (cards[i].frame_type.toLowerCase() === frame_type.toLowerCase()) {
            cardResult.push(cards[i])
        }
    }

    return cardResult
}

export function getCardsByAtkRange(minAtk: number, maxAtk: number, cards:CardType[] = []): CardType[] {
    if (!cards.length) cards = cardDB as CardType[]
    const cardResult: CardType[] = []

    for (let i=0; i<cards.length; i++) {
        if (cards[i].atk >= minAtk && cards[i].atk <= maxAtk) {
            cardResult.push(cards[i])
        }
    }

    return cardResult
}

export function getCardsByDefRange(minDef: number, maxDef: number, cards:CardType[] = []): CardType[] {
    if (!cards.length) cards = cardDB as CardType[]
    const cardResult: CardType[] = []

    for (let i=0; i<cards.length; i++) {
        if (cards[i].def >= minDef && cards[i].def <= maxDef) {
            cardResult.push(cards[i])
        }
    }

    return cardResult
}

export function getCardsBylevelRange(minLvl: number, maxLvl: number, cards:CardType[] = []): CardType[] {
    if (!cards.length) cards = cardDB as CardType[]
    const cardResult: CardType[] = []

    for (let i=0; i<cards.length; i++) {
        if (cards[i].level >= minLvl && cards[i].level <= maxLvl) {
            cardResult.push(cards[i])
        }
    }

    return cardResult
}

export function getCardsById(id: number, cards:CardType[] = []): CardType[] {
    if (!cards.length) cards = cardDB as CardType[]
    const cardResult: CardType[] = []

    for (let i=0; i<cards.length; i++) {
        if (cards[i].card_id === id) {
            cardResult.push(cards[i])
        }
    }

    return cardResult
}