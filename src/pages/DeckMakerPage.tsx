import React, { useState, useEffect, useRef } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import '../styles/deckMakerPage.css'
import { CardType } from '../types/cardType'
import { getCardsByArchetype, getCardsByName, getCardsByText } from '../controller/ygoController'
import { removeElementAtIndex } from '../controller/controller'
import NavBar from '../components/NavBar'
import monsterFrame from '../assets/card_frame_sprites/monsterFrame.png'
import spellFrame from '../assets/card_frame_sprites/spellFrame.png'
import trapFrame from '../assets/card_frame_sprites/trapFrame.png'
import extraFrame from '../assets/card_frame_sprites/extraFrame.png'
import { addDeck } from '../firebase/firebase'



export default function DeckMakerPage() {
    const searchOptions = ['Search by Card Name', 'Search by Archetype', 'Search by Card Text']

    const searchOptionsRef:any = useRef(null)
    const filterInputRef:any = useRef(null)
    const deckContainerRef:any = useRef(null)

    const { loginCheck, currentUser } = useAuth()
    const [monsters, setMonsters] = useState([])
    const [spells, setSpells] = useState([])
    const [traps, setTraps] = useState([])
    const [mainDeck, setMainDeck] = useState([])
    const [extraDeck, setExtraDeck] = useState([])
    const [deckTitle, setDeckTitle] = useState('')
    const [filteredCards, setFilterCards] = useState([])
    const [infoName, setInfoName] = useState('')
    const [infoImage, setInfoImage] = useState('')
    const [infoDesc, setInfoDesc] = useState('')
    const [coverCard, setCoverCard] = useState('')
    const [saveError, setSaveError] = useState('')
    const [saveConfirm, setSaveConfirm] = useState('')

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
        setSaveError('')
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
    }

    function removeCardFromDeck(deck:string, index:number) {
        setSaveError('')
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

    function displayInfoCard(card:CardType) {
        setInfoName(card.name)
        setInfoImage(card.image)
        setInfoDesc(card.card_desc)
    }

    function handleEmptyDeck() {
        setMonsters([])
        setSpells([])
        setTraps([])
        setExtraDeck([])
        setCoverCard('')
        setSaveError('')
    }

    function settingCoverCard(card:CardType) {
        setCoverCard(card.image)
    }

    function saveDeck() {
        setSaveError('')
        setSaveConfirm('')

        if (!deckTitle) {
            setSaveError('Your deck needs a title')
            deckContainerRef.current.scrollTop = deckContainerRef.current.scrollHeight
            return
        }

        if (mainDeck.length < 40) {
            setSaveError('Your main deck needs a minimum of 40 cards')
            deckContainerRef.current.scrollTop = deckContainerRef.current.scrollHeight
            return
        }

        if (!coverCard) {
            setSaveError('Your deck needs a cover card')
            deckContainerRef.current.scrollTop = deckContainerRef.current.scrollHeight
            return
        }

        addDeck({
            title: deckTitle,
            cover_card: coverCard,
            monsters: monsters,
            spells: spells,
            traps: traps,
            extra_deck: extraDeck,
            owner: currentUser.email
        })
        setSaveConfirm(`${deckTitle} Deck Save`)
        deckContainerRef.current.scrollTop = deckContainerRef.current.scrollHeight
    }

    function handleDeckTitle(e:any) {
        setSaveError('')
        setDeckTitle(e.target.value)
    }

  return (
    <div className='deck-maker-page'>
        <NavBar />
        <div className='deck-maker-container'>
            <div className='card-info-container'>
                {infoName &&
                <div className='card-container'>
                    <h4 className='card-name'>{infoName}</h4>
                    <img src={infoImage} className='card-img' alt='card info'/>
                    <div className='desc-container'><p className='card-desc'>{infoDesc}</p></div>
                </div>
                }
            </div>
            
            <div ref={deckContainerRef} className='deck-container'>
                <div className='deck-title'>
                    <input onChange={handleDeckTitle} placeholder='Deck Title' style={ {textAlign: 'center'} }/>
                    <div className='card-frame-container'>
                        <div className='container monster'>
                            <img src={monsterFrame} alt='monster card frame'/>
                            <h4>{`x${monsters.length}`}</h4>
                        </div>
                        <div className='container spell'>
                            <img src={spellFrame} alt='spell card frame'/>
                            <h4>{`x${spells.length}`}</h4>
                        </div>
                        <div className='container trap'>
                            <img src={trapFrame} alt='trap card frame'/>
                            <h4>{`x${traps.length}`}</h4>
                        </div>
                        <div className='container extra'>
                            <img src={extraFrame} alt='extradeck card frame'/>
                            <h4>{`x${extraDeck.length}`}</h4>
                        </div>
                    </div>
                    {coverCard &&
                    <img onClick={() => setCoverCard('')} className='cover-card' src={coverCard} alt='cover card'/>
                    }
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
                <div className='save-deck-container'>
                    <button onClick={saveDeck} className='save-deck'>Save Deck</button>
                    <button onClick={handleEmptyDeck} className='empty-deck'>Empty Deck</button>
                </div>
                {saveError &&
                    <Alert variant='danger'>{saveError}</Alert>
                }
                {saveConfirm &&
                    <Alert variant='success'>{saveConfirm}</Alert>
                }
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
                        <img onClick={() => displayInfoCard(card)} src={card.image} alt='card'/>
                        <div className='buttons'>
                            <button onClick={() => addCardToDeck(card)}>Add to Deck</button>
                            <button onClick={() => settingCoverCard(card)}>Set as Cover</button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
