import React from 'react'
import '../styles/cardPreview.css'

export default function CardPreview(props:any) {
  return (
    <div onClick={props.removePreview} className='card-preview-container'>
        <img src={props.image} alt='card'/>
    </div>
  )
}
