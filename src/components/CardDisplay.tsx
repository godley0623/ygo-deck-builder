import React, {useState} from 'react'
import { CardType } from '../types/cardType'
import '../styles/cardDisplay.css'
import { capFirstLetter as cap } from '../controller/controller'
import { attributeImages, levelImages, stImages } from '../controller/ygoController'
import CardPreview from './CardPreview'

export default function CardDisplay(props:any) {
    const [preview, setPreview] = useState('')

    function showPreview(index: number) {
        setPreview(props.cards[index].image)
    }
    function removePreview() {
        setPreview('')
    }

    function getCardType(card:CardType): string {
        const frame = card.frame_type
        if (frame.includes('normal') || frame.includes('effect') || frame === 'fusion' || frame === 'ritual' || frame === "synchro" || frame === 'pendulum' || frame === 'token') {
            return 'level monster'
        } else if (frame === 'xyz') {
            return 'rank monster'
        } else if (frame === 'link') {
            return 'link monster'
        } else if (frame === 'spell' || frame === 'trap') {
            return 'st'
        } else if (frame === 'skill') {
            return 'skill'
        }

        return ''
    }

    function monsterZeroCheck(card:CardType):number[] {
        const stats:number[] = []

        if (card.atk === -1) {
            stats.push(0)
        } else {
            stats.push(card.atk)
        }

        if (card.def === -1) {
            stats.push(0)
        } else {
            stats.push(card.def)
        }

        return stats
    }

    function getMonsterRace(card:CardType) {
        const monsterType = card.race
        let result = `[ ${monsterType} / `

        const frame = card.frame_type
        if (frame.includes('pendulum')) {
            const pend = frame.split('_')
            result = `${result}${cap(pend[0])} / ${cap(pend[1])} ]`
        } else {
            result = `${result}${cap(frame)} ]`
        }

        return result
    }

    function getSTType(card:CardType) {
        if (card.race === 'Quick-Play') return 'quickPlay'

        return card.race.toLowerCase()
    }

    function getSTRace(card:CardType) {
        const frame = card.frame_type
        const race = card.race
        let result = `[ ${cap(frame)} / ${race} ]`

        return result
    }

    return (
    <div className='card-display-container'>
        {preview && <CardPreview image={preview} removePreview={removePreview}/>}
        {props.cards.map((card: CardType, key: number) => (
            <div key={key} className='card-container'>
                <img onClick={() => showPreview(key)} className='card-image' src={card.image} alt={card.name}/>
                <div className='info-container'>
                    
                    <h4 className='card-name'>{card.name}</h4>
                    
                    {getCardType(card) !== 'skill' && <div className='stat-container'>
                        <div className='attribute-container'>
                            {getCardType(card).includes('monster') && 
                            <>
                            <img src={attributeImages(card.attribute.toLowerCase())} alt={`${card.attribute}`}/>
                            <h4>{card.attribute}</h4>
                            </>
                            }

                            {getCardType(card) === 'st' && 
                            <>
                            <img src={stImages(card.frame_type)} alt={`${card.frame_type}`}/>
                            {card.race.toLowerCase() !== 'normal' && <img src={stImages(getSTType(card))} alt='spell/trap type'/>}
                            </>
                            }
                        </div>

                        { getCardType(card).includes('level') && <div className='level-container'>
                            <>
                            <img src={levelImages['level']} alt='level'/>
                            <h4>x{card.level}</h4>
                            </>
                        </div>}
                        { getCardType(card).includes('rank') && <div className='level-container'>
                            <>
                            <img src={levelImages['rank']} alt='rank'/>
                            <h4>x{card.level}</h4>
                            </>
                        </div>}
                        { getCardType(card).includes('link') && <div className='level-container'>
                            <>
                            <img src={levelImages['link']} alt='link'/>
                            <h4>x{card.level}</h4>
                            </>
                        </div>}

                        { getCardType(card).includes('monster') && <div className='atk-container'> 
                            <>
                            <h4>ATK {monsterZeroCheck(card)[0]}</h4>
                            </>
                        </div>}
                        { getCardType(card).includes('monster') && !getCardType(card).includes('link') && <div className='atk-container'> 
                            <>
                            <h4>DEF {monsterZeroCheck(card)[1]}</h4>
                            </>
                        </div>}

                    </div>}

                    <div className='race-container'>
                        { getCardType(card).includes('monster') && <div>
                            <>
                            <h4>{getMonsterRace(card)}</h4>
                            </>
                        </div>}

                        { getCardType(card) === 'st' && <div>
                            <>
                            <h4>{getSTRace(card)}</h4>
                            </>    
                        </div>}

                        { getCardType(card) === 'skill' && <div>
                            <>
                            <h4>{`[ Skill / ${card.race} ]`}</h4>
                            </>    
                        </div>}
                    </div>
                    
                    <div className='desc-container'>
                        <p>{card.card_desc}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}
