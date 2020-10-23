/**
 *  ⬢ rocky-shelf-71442
 *  https://rocky-shelf-71442.herokuapp.com/ 
 *  https://git.heroku.com/rocky-shelf-71442.git
 * 
*/

const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('./config/config')
app.use(require('./routes/usuario'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.json('Hola mundo')
})

app.listen(process.env.PORT, () => {
    console.log('Server running:', process.env.PORT);
})


mongoose.connect(
    process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (!err) {
            console.log('DB conneccted');
        } else {
            console.log('Error connecting', err);
        }
    })