const express = require('express')
const Categoria = require('../models/categoria')
let { verifyToken, verifyRoleAdmin } = require('../middlewares/auth')
const app = express()
// Crear Categoria
app.post('/categoria', verifyToken, (request, response) => {
    let body = request.body
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: request.usuario._id
    })
    categoria.save((err, categoriaDB) => {
        if (err) {
            return response.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return response.status(500).json({
                ok: false,
                err
            })
        }
        response.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})
//Actualizar categoria por ID
app.put('/categoria/:id', verifyToken, (request, response) => {
    let id = request.params.id
    let body = request.body
    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return response.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return response.status(500).json({
                ok: false,
                err
            })
        }
        response.json({
            ok: true,
            categoria: categoriaDB
        })
    })

})

//Eliminar categoria por id
app.delete('/categoria/:id', [verifyToken, verifyRoleAdmin], (request, response) => {
    let id = request.params.id
    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
        if (err) {
            return response.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return response.status(500).json({
                ok: false,
                err,
                message: 'El id no existe'
            })
        }
        response.json({
            ok: true,
            message: 'Categoria borrada'
        })

    })
})

//Buscar todas las categorias
app.get('/categoria', (request, response) => {
    Categoria.find({})
    .sort('asc')
    .populate('usuario', 'name email')
    .exec((err, categorias) => {
        if (err) {
            return response.status(500).json({
                ok: false,
                err
            })
        }
        response.json({
            ok: true,
            categorias
        })
    })
})

app.get('/categoria/:id', (request, response) => {
    let id = request.params.id
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return response.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return response.status(500).json({
                ok: false,
                message: 'El id no existe'
            })
        }
        response.json({
            ok: true,
            categoria: categoriaDB
        })

    })
})
module.exports = app
