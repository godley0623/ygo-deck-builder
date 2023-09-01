import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import NavBar from '../components/NavBar'
import { deleteDeckByID, getDecksByOwner } from '../firebase/firebase'
import { DeckType } from '../types/deckType'
import { CardType } from '../types/cardType'
import '../styles/profilePage.css'
import CardPreview from '../components/CardPreview'
import { Button } from 'react-bootstrap'

type CardListType = {
    quantity: number;
    image: string;
}


export default function ProfilePage() {
    const { loginCheck, currentUser } = useAuth()
    const user = currentUser.email.split('@')[0]

    const [decks, setDecks] = useState([])
    const [preview, setPreview] = useState('')
    const [deleteDeck, setDeleteDeck] = useState('')

    useEffect(() => {
        loginCheck()
        getDecksByOwner(currentUser.email, setDecks)
    }, [loginCheck, currentUser.email])

    function getDeckList(deck:DeckType):[string, CardListType][] {
        const mainDeck:CardType[] = [...deck.monsters, ...deck.spells, ...deck.traps]
        const extraDeck:CardType[] = deck.extra_deck
        let deckList:any = {}

        for (let i=0; i<mainDeck.length; i++) {
            if (mainDeck[i].name in deckList) {
                deckList[mainDeck[i].name].quantity++
            } else {
                deckList[mainDeck[i].name] = { quantity: 1, image: mainDeck[i].image }
            }
        }

        for (let i=0; i<extraDeck.length; i++) {
            if (extraDeck[i].name in deckList) {
                deckList[extraDeck[i].name].quantity++
            } else {
                deckList[extraDeck[i].name] = { quantity: 1, image: extraDeck[i].image }
            }
        }

        return Object.entries(deckList)
    }

    function removePreview() {
        setPreview('')
    }

    function showPreview(image:string) {
        setPreview(image)
    }

    function deleteDeckFromDB() {
        deleteDeckByID(deleteDeck)
        setDeleteDeck('')
    }

  return (
    <div className='profile-page'>
        {preview && <CardPreview image={preview} removePreview={removePreview}/>}
        {deleteDeck && 
        <div className='delete-deck-container'>
            <div className='option-container'>
                <h4>Are you sure you want to delete this deck?</h4>
                <div className='buttons'>
                    <Button onClick={deleteDeckFromDB} variant='danger'>Yes</Button>
                    <Button onClick={() => setDeleteDeck('')} variant='primary'>No</Button>
                </div>
            </div>
        </div>
        }
        <NavBar />
        <div className='decks-container'>
            <h1>{`${user}'s Decks`}</h1>
            {decks.map((deck:DeckType, key) => (
                <div key={key} className='deck-container'>
                    <div className='deck-options'>
                        <img onClick={() => showPreview(deck.cover_card)} className='cover-card' src={deck.cover_card} alt="cover card" />
                        <div className='edit-delete'>
                            <i className="fa-regular fa-pen-to-square"></i>
                            <i onClick={() => setDeleteDeck(deck.id)} className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                    <div className='deck-info'>
                        <h2 className='deck-title'>{deck.title}</h2>
                        <div className='deck-list'>
                            {getDeckList(deck).map((card:[string, CardListType], key) => (
                                <div className='list-container'>
                                <img onClick={() => showPreview(card[1].image)} className='card-icon' key={key} src={card[1].image} alt="card icon" />
                                <h4 className='card-name' key={key}>{`${card[0]} x${card[1].quantity}`}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}
