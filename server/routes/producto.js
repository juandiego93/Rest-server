const express = require('express')
const app = express()
const { verifyToken } = require('../middlewares/auth')
const Producto = require('../models/producto')

app.get('/productos', verifyToken, (request, response) => {
    let desde = request.query.desde || 0
    desde = Number(desde)
    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return response.json({
                    ok: false,
                    err
                })
            }
            response.json({
                ok: true,
                productos
            })

        })
})

app.post('/productos', verifyToken, (request, response) => {
    let body = request.body
    const cat = request.body.categoria
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        usuario: request.usuario._id,
    })
    producto.categoria = cat
    producto.save((err, productoDB) => {
        if (err) {
            return response
                .status(500)
                .json({
                    ok: false,
                    err
                })
        }
        response.status(201).json({
            ok: true,
            producto: productoDB
        })
    })

})

app.put('/productos/:id', verifyToken, (request, response) => {
    let id = request.params.id
    let body = request.body

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return response.json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return response.json({
                ok: false,
                err,
                message: 'ID inexistente'
            })
        }

        productoDB.nombre = body.nombre
        productoDB.precioUni = body.precioUni
        productoDB.categoria = body.categoria
        productoDB.disponible = body.disponible
        productoDB.descripcion = body.descripcion

        productoDB.save((err, productoSaved) => {
            if (err) {
                return response.json({
                    ok: false,
                    err
                })
            }
            response.status(200).json({
                ok: true,
                producto: productoSaved
            })
        })



    })

})

app.get('/productos/:id', verifyToken, (request, response) => {

    let id = request.params.id
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if (err) {
                return response.json({
                    ok: false,
                    err
                })
            }
            if (!productoDB) {
                return response.json({
                    ok: false,
                    message: 'ID inexistente'
                })
            }
            response.status(200).json({
                ok: true,
                producto: productoDB
            })
        })
})

app.delete('/productos/:id', verifyToken, (request, response) => {
    let id = request.params.id
    Producto.findByIdAndUpdate(id, { 'disponible': false }, (err, productoDB) => {
        if (err) {
            return response.json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return response.json({
                ok: false,
                message: 'ID inexistente'
            })
        }
        response.json({
            ok: true,
            producto: productoDB,
            message: 'Producto borrado'
        })
        // productoDB.disponible = false

        // productoDB.save((err, productoDesactivado) => {
        //     if (err) {
        //         return response.json({
        //             ok: false,
        //             err
        //         })
        //     }
        //     response.json({
        //         ok: true,
        //         producto: productoDesactivado,
        //         message: 'Producto borrado'
        //     })
        // })
    })
})

app.get('/productos/buscar/:cadena', verifyToken, (request, response) => {
    let termino = request.params.termino
    let regex = new Regexp(termino, 'i')
    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return response.json({
                    ok: false,
                    err
                })
            }
            response.json({
                ok: true,
                productos
            })
        })
})
module.exports = app