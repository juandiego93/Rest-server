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
