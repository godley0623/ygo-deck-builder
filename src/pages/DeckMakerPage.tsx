import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import '../styles/deckMakerPage.css'
import { CardType } from '../types/cardType'

export default function DeckMakerPage() {
    const { loginCheck } = useAuth()
    const [monsters, setMonsters] = useState([])
    const [spells, setSpells] = useState([])
    const [traps, setTraps] = useState([])
    const [mainDeck, setMainDeck] = useState([])
    const [extraDeck, setExtraDeck] = useState([])

    useEffect(() => {
        loginCheck()
    }, [loginCheck])

    useEffect(() => {
        setMainDeck([...monsters, ...spells, ...traps])
    }, [monsters, spells, traps])

  return (
    <div className='deck-maker-container'>
        <div className='card-info-container'>
            <div className='card-container'>
                <img className='card-img' alt='card info'/>
                <h4 className='card-name'>Card Name</h4>
            </div>
        </div>
        
        <div className='deck-container'>
            <div className='deck-title'>
                <input placeholder='Deck Title' style={ {textAlign: 'center'} }/>
            </div>
            <div className='main-deck-container'></div>
            <div className='extra-deck-container'></div>
            <div className='save-deck-container'></div>
        </div>

        <div className='search-container'>
            <div className='filter-container'>
                <input placeholder='Keyword' style={ {textAlign: 'center'} }/>
            </div>
            <div className='searched-cards-container'></div>
        </div>
    </div>
  )
}
