import cards from './cards.json' assert { type: "json" }
import fs from 'fs'

const cardSeedArr = []

cards.forEach((card) => {
    cardSeedArr.push({
        card_id: card.id,
        name: card.name,
        type: card.type,
        frame_type: card.frameType,
        card_desc: card.desc,
        atk: card.atk || -1,
        def: card.def || -1,
        level: card.level || card.linkval || -1,
        race: card.race,
        attribute: card.attribute || '',
        archetype: card.archetype || '',
        image: card.card_images[0].image_url
    })
})

fs.writeFile('cardDB.json', JSON.stringify(cardSeedArr), (err) => {
    if (err) {
        console.error(err)
    }else {
        console.log('File written successfully')
    }
})

export const cardSeed = cardSeedArr