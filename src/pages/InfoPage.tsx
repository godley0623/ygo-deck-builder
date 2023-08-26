import React from 'react'

export default function InfoPage() {
  return (
    <div>InfoPage</div>
  )
}

// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { getCardsById, levelImages, attributeImages } from '../controller/ygoController'

// export default function InfoPage() {
//     const cardId = Number(useParams().id)
//     const card = getCardsById(cardId)[0]

//   return (
//     <div className='info-page'>
//         <div className='info-container'>
//             <img src={card.image} alt={`${card.name}`}/>
//             <h4>{card.name}</h4>
//             <div className='lvl-attribute'>
//                 {card.frame_type !== 'xyz' && card.frame_type !== 'link' && card.frame_type !== 'spell' && card.frame_type !== 'trap' &&
//                 <>
//                 <div className='levels'>
//                     <img src={levelImages['level']} alt='level images'/>
//                     <h4>x{card.level}</h4>
//                 </div>
//                 <div className='attribute'>
//                     <img src={attributeImages(card.attribute.toLowerCase())}/>
//                 </div>
//                 </>
//                 }
//             </div>
//         </div>
//     </div>
//   )
// }
