import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCardsByArchetype, getCardsByName } from '../controller/ygoController'
import { CardType } from '../types/cardType'
import CardSearch from '../components/CardSearch'
import CardDisplay from '../components/CardDisplay'
import '../styles/searchPage.css'

export default function SearchPage() {
    const navigate = useNavigate()

    const query = useParams().query || 'name'
    const keyword = useParams().keyword || 'dark magician'
    const page = Number(useParams().page) || 1

    const cardsPerPage = 20

    const cards = getCards()
    const cardsOnPage = getCardsOnPage(cards)
    let numOfPages:number
    if (cards.length < cardsPerPage) {
        numOfPages = 1;
    } else {
        numOfPages = Math.floor(cards.length / cardsPerPage)
        if ( (cards.length / cardsPerPage) > numOfPages) numOfPages++
    }

    useEffect(() => {
        if (page > numOfPages) {
            navigate(`/search/${query}/${keyword}/${numOfPages}`)
        }
    }, [keyword, navigate, numOfPages, page, query])

    function getCards() {
        if (query === 'name') {
            return getCardsByName(keyword)
        } else if (query === 'archetype') {
            return getCardsByArchetype(keyword)
        }

        return getCardsByName('dark magician')
    }

    function getCardsOnPage(cards:CardType[]) {
        const result:CardType[] = []
        const starting = cardsPerPage * (page - 1)

        for ( let i=starting; i<(starting+20); i++ ) {
            if (cards[i]) result.push(cards[i])
        }

        return result

    }

  return (
    <div className='search-page'>
        <CardSearch />
        <CardDisplay cards={cardsOnPage}/>
    </div>
  )
}
