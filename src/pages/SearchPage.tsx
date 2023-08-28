import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCardsByArchetype, getCardsByName, getCardsByText } from '../controller/ygoController'
import { CardType } from '../types/cardType'
import NavBar from '../components/NavBar'
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
        } else if (query === 'text') {
            return getCardsByText(keyword)
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

    function getPages() {
        const pages:number[] = []
        let pagesToDisplay = 5
        let startingPage = page

        while (pagesToDisplay > 0) {
            if (startingPage <= numOfPages) {
                pages.push(startingPage)
                startingPage++
            }else {
                for (let i=(page-1); i > 0; i--) {
                    if (pages.length < 5) pages.unshift(i)
                }
                break
            }

            pagesToDisplay--
        }

        return pages
    }

    function goToPage(page:number) {
        window.scroll(0, 0);
        navigate(`/search/${query}/${keyword}/${page}`)
    }

  return (
    <div className='search-page'>
        <NavBar />
        <CardSearch />
        <CardDisplay cards={cardsOnPage}/>
        {numOfPages > 1 && <div className='page-button-container'>
            {page !== 1 && 
            <>
            <button onClick={() => goToPage(1)}>{'<<'}</button>
            <button onClick={() => goToPage(page - 1)}>{'<'}</button>
            </>
            }

            {getPages().map((page, key) => (
                <button onClick={() => goToPage(page)} key={key}>{page}</button>
            ))}

            {page !== numOfPages &&
            <>
            <button onClick={() => goToPage(page + 1)}>{'>'}</button>
            <button onClick={() => goToPage(numOfPages)}>{'>>'}</button>
            </>
            }
        </div>}
    </div>
  )
}
