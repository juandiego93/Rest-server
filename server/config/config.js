//PORT
process.env.PORT = process.env.PORT || 3000

//ENVIROMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//DB
let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/cafe'
} else {
    urlDB = process.env.MONGO_URI
}
process.env.URLDB = urlDB;

//SEDD de Autenticacion

process.env.SEED = process.env.SEED || 'secret-de-desarrollo'

// Vencimiento Token
// 60 seg * 60 min * 24h * 30d
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30


//Google CLient ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '989758366480-j85dhe5eb061agtfeqvndsclfk6l5290.apps.googleusercontent.com'

//Publish Dosc Postman
//https://documenter.getpostman.com/view/6795617/TVmJhe1m