import React from 'react'
import { getRandomCards } from '../controller/ygoController'
import CardDisplay from '../components/CardDisplay'


export default function HomePage() {
    const randomCards = getRandomCards(20)
  return (
    <div className='home-page'>
        <CardDisplay cards={randomCards}/>
    </div>
  )
}
