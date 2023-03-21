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

const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedProduct)
})

const getOneProduct = asyncHandler(async (req, res) => {

    const product = await Product.findOne({ _id: req.params.id })

    if (!product) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }
    res.status(200).json(product)
})

const getProducts = asyncHandler(async (req, res) => {

    const product = await Product.find()

    if (!product) {
        res.status(400)
        throw new Error('No hay ningún producto registrado')
    }
    res.status(200).json(product)
})



const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
        product,
        Success: 'Producto eliminado exitosamente.'
    })
})

module.exports = {
    setOrder,
    updateProduct,
    getOneProduct,
    getProducts,
    deleteProduct
}