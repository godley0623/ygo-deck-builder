import React from 'react'
import { useParams } from 'react-router-dom'
import { getCardsById } from '../controller/ygoController'

export default function InfoPage() {
    const cardId = Number(useParams().id)
    const card = getCardsById(cardId)[0]

  return (
    <div className='info-page'>
        <div className='info-container'>
            <img src={card.image} alt={`${card.name}`}/>
        </div>
    </div>
  )
}
