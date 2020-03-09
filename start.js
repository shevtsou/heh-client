//@ts-check
(async() => {
    var term = require( 'terminal-kit' ).terminal ;

    const HOST = "http://localhost:3000"
    // require('dotenv').config()
// Readline lets us tap into the process events

// const user = require('readline-sync');
// const axios = require('axios')

// const name = user.question("Name: ")

// console.log(response.data)

// const USER_ID = response.data.id


const axios = require('axios')
const name = "NIKITOS"

const response = await axios.post(`${HOST}/registerUser`, {
    "name": name,
    "password": "1234"
  })
const userId = response.data.id
console.log(userId)
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


setInterval(async ()=> {
    term.moveTo(1, 1)
    const response2 = await axios.post(`${HOST}/info`, {
        userId
    })
    
    const field = await axios.post(`${HOST}/field`, {
        userId,
        x: response2.data.x,
        y: response2.data.y
    })
    term(field.data.value)
}, 100)

process.stdin.on('keypress',  async (str, key) => {
    if (key.name === 'q') {
        process.exit()
    }
    const response = await axios.post(`${HOST}/do`, {
    "action": str,
    userId
    })

    // console.log(response.data)
    // console.log(str)
    // console.log(key)
})

})()



