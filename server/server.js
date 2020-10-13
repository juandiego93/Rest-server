/**
 *  ⬢ rocky-shelf-71442
 *  https://rocky-shelf-71442.herokuapp.com/ 
 *  https://git.heroku.com/rocky-shelf-71442.git
 * 
 */

const express = require('express')
const app = express()
require('./config/config')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.json('Hola mundo')
})

app.get('/usuario', (request, response) => {
    response.json('Hola mundo')
})

app.post('/usuario', (request, response) => {
    let body = request.body
    if (body.nombre === undefined) {
        response.status(400).json({
            ok: false,
            message: 'El nombre es necesario'
        })
    } else {
        response.json({ body })
    }
})

app.put('/usuario/:id', (request, response) => {
    let id = request.params.id
    response.json({ id })
})

app.delete('/usuario', (request, response) => {
    response.json('Hola mundo')
})

app.listen(process.env.PORT, () => {
    console.log('Server running:', port);
})