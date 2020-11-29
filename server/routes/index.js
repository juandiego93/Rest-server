const express = require('express')
const app = express()

// app.use(require('./login'), (a) => {
//     console.log('a_a_a', a);
// })
// app.use(require('./usuario'), (a) => {
//     console.log('b_b_b', a);
// })

app.use(require('./usuario.js'))
app.use(require('./login.js'))

module.exports = app
