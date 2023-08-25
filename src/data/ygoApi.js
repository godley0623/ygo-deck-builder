import axios from 'axios'
import fs from 'fs'

axios
  .get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
  .then((response) => {
    fs.writeFile('cards.json', JSON.stringify(response.data.data), (err) => {
        if (err) {
            console.error(err)
        }else {
            console.log('File written successfully')
        }
    })
  })
  .catch((err) => console.log(err));