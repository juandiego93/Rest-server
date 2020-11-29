const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const Usuario = require('../models/usuario')
const client = new OAuth2Client(process.env.CLIENT_ID);
const app = express()

app.post('/login', (request, response) => {
    let body = request.body
    const promiseSearchUser = Usuario.findOne({ email: body.email }).exec()
    promiseSearchUser
        .then(usuarioDB => {
            if (!usuarioDB) {
                return response.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrectos1'
                    }
                })
            }

            const matchPass = bcrypt.compareSync(`${body.password}`, `${usuarioDB.password}`)
            if (!matchPass) {
                return response.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrectos2'
                    }
                })
            }

            let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

            response.json({
                ok: true,
                usuario: usuarioDB,
                token
            })
        })
        .catch(err => {
            return response.status(500).json({
                ok: false,
                err,
                token
            })
        })
})


// Configuraciones de Google 
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    console.log(payload);
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}
// verify().catch(console.error);


app.post('/google', async (request, response) => {

    const token = request.body.idtoken

    let googleUser = await verify(token)
        .catch(e => {
            return response.status(403).json({
                ok: false,
                err: e,
                line: 86
            })
        })

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return response.status(500).json({
                ok: false,
                err,
                line: 95
            })
        }
        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return response.status(400).json({
                    ok: false,
                    err: {
                        message: 'Debe usar autenticación normal',
                        line: 104
                    }
                })
            } else {
                const token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

                return response.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }
        } else {
            //Si usuario no existe -> nuevo usuario
            let usuario = new Usuario()
            usuario.name = googleUser.nombre
            usuario.email = googleUser.email
            usuario.img = googleUser.picture
            usuario.google = true
            usuario.password = ':)'
            usuario.save((err, usuarioDB) => {
                if (err) {
                    return response.status(500).json({
                        ok: false,
                        err,
                        line: 131
                    })
                }
                const token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

                return response.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            })
        }
    })
})

module.exports = app