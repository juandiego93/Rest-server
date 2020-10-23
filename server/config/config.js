//PORT
process.env.PORT = process.env.PORT || 3000

//ENVIROMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//DB
let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/cafe'
} else {
    urlDB = 'mongodb+srv://juanAdmin1:zH4DKPTN7FiK5SP9@cluster0.y4xry.mongodb.net/Cafe'
}

process.env.URLDB = urlDB;