const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const Order = require('../model/orderModel')
const User = require('../model/userModel')
const Product = require('../model/productModel')



const setOrder = asyncHandler(async (req, res) => {

    let { name, quantity } = req.body

    //Convertimos la primera letra de name en mayúscula
    name = name.charAt(0).toUpperCase() + name.slice(1)

    // Validar los campos del producto
    if (!name) {
        res.status(400)
        throw new Error('Favor de verificar que exista el producto')
    }
    if (!quantity) {
        res.status(400)
        throw new Error('Favor de ingresar la cantidad de pedidos para este producto')
    }

    const productExiste = await Product.findOne({ name })

    if (!productExiste) {
        res.status(400)
        throw new Error(`No existe un registro para este producto, favor de verificar.`)
    }


    const orden = await Order.create({
        user: req.user.id,
        orderItems: [{
            name: productExiste.name,
            description: productExiste.description,
            category: productExiste.category,
            price: productExiste.price,
            image: productExiste.image,
            quantity,
            product: productExiste.id
        }]
    })

    if (orden) {
        res.status(201).json({
            user: req.user.id,
            name: productExiste.name,
            description: productExiste.description,
            category: productExiste.category,
            price: productExiste.price,
            image: productExiste.image,
            quantity,
            product: productExiste.id,
            message: 'Orden registrada exitosamente'
        })
    } else {
        res.status(400)
        throw new Error('No se pudo generar la orden')
    }
})

const updateOrder = asyncHandler(async (req, res) => {

    const orden = await Order.findById(req.params.id)

    if (!orden) {
        res.status(400)
        throw new Error('Orden no encontrada')
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })    

    res.status(200).json(updatedOrder)
})

const getOneOrder = asyncHandler(async (req, res) => {

    const orden = await Order.findOne({ _id: req.params.id })

    if (!orden) {
        res.status(400)
        throw new Error('Orden no encontrada')
    }
    res.status(200).json(orden)
})

const getOrders = asyncHandler(async (req, res) => {

    const orden = await Order.find()

    if (!orden) {
        res.status(400)
        throw new Error('No tiene ningúna orden registrada')
    }
    res.status(200).json(orden)
})

const deleteOrder = asyncHandler(async (req, res) => {

    const orden = await Order.findById(req.params.id)

    if (!orden) {
        res.status(400)
        throw new Error('Orden no encontrada')
    }

    const deletedOrden = await Order.findByIdAndDelete(req.params.id)

    res.status(200).json({
        deletedOrden,
        Success: 'Orden eliminadoa exitosamente.'
    })
})

module.exports = {
    setOrder,
    updateOrder,
    getOneOrder,
    getOrders,
    deleteOrder
}