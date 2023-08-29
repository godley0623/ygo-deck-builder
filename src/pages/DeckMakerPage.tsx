import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/authContext'
import '../styles/deckMakerPage.css'
import { CardType } from '../types/cardType'
import { getCardsByArchetype, getCardsByName, getCardsByText } from '../controller/ygoController'
import { removeElementAtIndex } from '../controller/controller'
import NavBar from '../components/NavBar'



export default function DeckMakerPage() {
    const searchOptions = ['Search by Card Name', 'Search by Archetype', 'Search by Card Text']

    const searchOptionsRef:any = useRef(null)
    const filterInputRef:any = useRef(null)

    const { loginCheck } = useAuth()
    const [monsters, setMonsters] = useState([])
    const [spells, setSpells] = useState([])
    const [traps, setTraps] = useState([])
    const [mainDeck, setMainDeck] = useState([])
    const [extraDeck, setExtraDeck] = useState([])
    const [filteredCards, setFilterCards] = useState([])

    useEffect(() => {
        loginCheck()
    }, [loginCheck])

    useEffect(() => {
        setMainDeck([...monsters, ...spells, ...traps])
    }, [monsters, spells, traps])

    function handleFilter() {
        const keyword = filterInputRef.current.value
        let filter = searchOptionsRef.current
        let cards: any;
        if (filter && keyword.length > 2) {
            filter = filter.value
            if (filter === 'Search by Card Name') {
                cards = getCardsByName(keyword)
                setFilterCards(cards)
            } else if (filter === 'Search by Archetype') {
                cards = getCardsByArchetype(keyword)
                setFilterCards(cards)
            } else if (filter === 'Search by Card Text') {
                cards = getCardsByText(keyword)
                setFilterCards(cards)
            }

        }
    }

    function cardPlacement(card:CardType) {
        const f = card.frame_type
        if ( f.includes('fusion') || f.includes('xyz') || f.includes('synchro') || f.includes('link') ){
            return 'extra'
        }

        return 'main'
    }

    function addCardToDeck(card:CardType) {
        const f = card.frame_type

        if (f === 'token' || f === 'skill') return
        
        if ( (cardPlacement(card) === 'main' && mainDeck.length >= 60) || (cardPlacement(card) === 'extra' && extraDeck.length >= 15) ) {
            return
        }

        if (cardPlacement(card) === 'main') {
            let copies = 0
            mainDeck.forEach((mdCard:CardType) => {
                if (mdCard.name === card.name) copies++
            })
            if (copies >= 3) return
        } else {
            let copies = 0
            extraDeck.forEach((edCard:CardType) => {
                if (edCard.name === card.name) copies++
            })
            if (copies >= 3) return
        }

        if (cardPlacement(card) === 'main') {
            if (f === 'spell') {
                let copy:any = [...spells]
                copy.push(card)
                setSpells(copy)
            } else if (f === 'trap') {
                let copy:any = [...traps]
                copy.push(card)
                setTraps(copy)
            } else {
                let copy:any = [...monsters]
                copy.push(card)
                setMonsters(copy)       
            }
        } else {
            let copy:any = [...extraDeck]
            copy.push(card)
            setExtraDeck(copy)
        }
        console.log(mainDeck)
        console.log(extraDeck)
    }

    function removeCardFromDeck(deck:string, index:number) {
        if (deck === 'main') {
            const card:CardType = mainDeck[index]
            const f = card.frame_type

            if (f === 'spell') {
                let copy = [...spells]
                for (let i=0; i<spells.length; i++) {
                    let spell:CardType = spells[i]
                    if (spell.name === card.name) {
                        copy = removeElementAtIndex(copy, i)
                        setSpells(copy)
                        return
                    }
                }
            }
            else if (f === 'trap') {
                let copy = [...traps]
                for (let i=0; i<traps.length; i++) {
                    let trap:CardType = traps[i]
                    if (trap.name === card.name) {
                        copy = removeElementAtIndex(copy, i)
                        setTraps(copy)
                        return
                    }
                }
            }
            else {
                let copy = [...monsters]
                for (let i=0; i<monsters.length; i++) {
                    let monster:CardType = monsters[i]
                    if (monster.name === card.name) {
                        copy = removeElementAtIndex(copy, i)
                        setMonsters(copy)
                        return
                    }
                }
            }

        } else if (deck === 'extra') {
            let copy = [...extraDeck]
            copy = removeElementAtIndex(copy, index)
            setExtraDeck(copy)
        }
    }

  return (
    <>
        <NavBar />
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
                <div className='main-deck-container'>
                    {mainDeck.map((card:CardType, key) => (
                        <img onClick={() => removeCardFromDeck('main', key)} src={card.image} alt='card'/>
                    ))}
                </div>
                <div className='extra-deck-container'>
                    {extraDeck.map((card:CardType, key) => (
                        <img onClick={() => removeCardFromDeck('extra', key)} src={card.image} alt='card' />
                    ))}
                </div>
                <div className='save-deck-container'></div>
            </div>

            <div className='search-container'>
                <div className='filter-container'>
                    <div className='input-container'>
                        <input ref={filterInputRef} onChange={handleFilter} placeholder='Keyword' style={ {textAlign: 'center'} }/>
                        <select onChange={handleFilter} ref={searchOptionsRef}>
                            {searchOptions.map((option, key) => (
                                <option key={key} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='searched-cards-container'>
                    {filteredCards.map((card:CardType, key) => (
                    <div className='card-container'>
                        <h4 key={key}>{card.name}</h4>
                        <img src={card.image} alt='card'/>
                        <button onClick={() => addCardToDeck(card)}>Add to Deck</button>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}
