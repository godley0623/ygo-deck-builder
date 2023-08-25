import React from 'react'
import { CardType } from '../types/cardType'
import '../styles/cardDisplay.css'
import { useNavigate } from 'react-router-dom'

export default function CardDisplay(props:any) {
    const navigate = useNavigate()

    function goToInfoPage(index: number) {
        const cardId = props.cards[index].card_id
        navigate(`/card-info/${cardId}`)
    }

    return (
    <div className='card-display-container'>
        {props.cards.map((card: CardType, key: number) => (
            <div key={key} className='card-container'>
                <img onClick={() => goToInfoPage(key)} className='card-image' src={card.image} alt={card.name}/>
                <h4 className='card-name'>{card.name}</h4>
            </div>
        ))}
    </div>
  )
}
