import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/cardSearch.css'

export default function CardSearch() {
    const navigate = useNavigate()

    const searchOptions = ['Search by Card Name', 'Search by Archetype']
    
    const [input, setInput] = useState('')
    const [option, setOption] = useState(searchOptions[0])

    function handleInput(e:any) {
        setInput(e.target.value)
    }

    function handleOption(e:any) {
        setOption(e.target.value)
    }

    function handleSearch() {
        if (input.length === 0) navigate('/')

        if (input.length < 3) return

        if (option === 'Search by Card Name') {
            navigate(`/search/name/${input}/1`)
        } else if (option === 'Search by Archetype') {
            navigate(`/search/archetype/${input}/1`)
        }
    }

  return (
    <div className='card-search-container'>
        <input onChange={handleInput} placeholder='Enter Keyword' className='card-search-input'></input>
        <select onChange={handleOption}>
            {searchOptions.map((option, key) => (
                <option key={key} value={option}>{option}</option>
            ))}
        </select>
        <button onClick={handleSearch}>Search</button>
    </div>
  )
}
