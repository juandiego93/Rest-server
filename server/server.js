/**
 *  ⬢ rocky-shelf-71442
 *  https://rocky-shelf-71442.herokuapp.com/ 
 *  https://git.heroku.com/rocky-shelf-71442.git
 *  
 *  KEYS GOOGLE
 *  ID-Cliente
 *  989758366480-j85dhe5eb061agtfeqvndsclfk6l5290.apps.googleusercontent.com
 *  Secret-Cliente
 *  lKg5Pq-_J--pYTr8GoJolRRh
*/
require('./config/config')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(require('./routes/index'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/', (request, response) => {
    response.json('Hola mundo')
})

app.listen((process.env.PORT), function () {
    console.log('Server running:', process.env.PORT);
})

mongoose.set('useCreateIndex', true)
mongoose.connect(
    process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (!err) {
            console.log('DB conneccted', process.env.URLDB);
        } else {
            console.log('Error connecting', err);
        }
    })