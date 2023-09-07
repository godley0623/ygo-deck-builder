import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/cardSearch.css'
import logo from '../assets/logo-main.png'

export default function CardSearch() {
    const navigate = useNavigate()

    const searchOptions = ['Search by Card Name', 'Search by Archetype', 'Search by Card Text']
    
    const [input, setInput] = useState('')
    const [option, setOption] = useState(searchOptions[0])
    const [hide, setHide] = useState('');

    function handleInput(e:any) {
        setInput(e.target.value)
    }

    function handleOption(e:any) {
        setOption(e.target.value)
    }

    function handleSearch() {
        if (input.length === 0) navigate('/')

        if (input.length < 1) return

        if (option === 'Search by Card Name') {
            navigate(`/search/name/${input}/1`)
        } else if (option === 'Search by Archetype') {
            navigate(`/search/archetype/${input}/1`)
        } else if (option === 'Search by Card Text') {
            navigate(`/search/text/${input}/1`)
        }
    }

    function toggleHide() {
        if (hide) {
            setHide('')
        }else {
            setHide('hide')
        }
    }

  return (
    <div className='card-search-container'>
        <img className={`${hide}`} src={logo} alt="yugioh logo"/>
        <div className="search-container">
            <input onChange={handleInput} placeholder='Enter Keyword' className={`card-search-input ${hide}`}></input>
            <select className={`${hide}`} onChange={handleOption}>
                {searchOptions.map((option, key) => (
                    <option key={key} value={option}>{option}</option>
                ))}
            </select>
            <button className={`${hide}`} onClick={handleSearch}>Search</button>
        </div>
        {hide &&
        <i onClick={toggleHide} className="fa-regular fa-eye"></i>
        }
        {!hide &&
         <i onClick={toggleHide} className="fa-regular fa-eye-slash"></i>
        }
    </div>
  )
}
