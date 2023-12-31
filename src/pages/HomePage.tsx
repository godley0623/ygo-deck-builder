import React from 'react'
import { getRandomCards } from '../controller/ygoController'
import CardDisplay from '../components/CardDisplay'
import CardSearch from '../components/CardSearch'
import NavBar from '../components/NavBar'
import '../styles/homePage.css'

export default function HomePage() {
    const randomCards = getRandomCards(20)

  return (
    <div className='home-page'>
        <div className='home-nav'>
          <NavBar />
          <CardSearch />
        </div>
        <CardDisplay cards={randomCards}/>
    </div>
  )
}
