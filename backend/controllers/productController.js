const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const Product = require('../model/productModel')



const registerProduct = asyncHandler(async (req, res) => {

    let { name, description, category, price, image } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Favor de verificar el nombre del producto')
    }
    if (!category) {
        res.status(400)
        throw new Error('Favor de verificar la categoria')
    }
    if (!price) {
        res.status(400)
        throw new Error('Favor de verificar el precio')
    }
    if (!image) {
        res.status(400)
        throw new Error('Favor de verificar la imagen')
    }
    if (!['Electronics', 'Clothing', 'Shoes', 'Books', 'Home', 'Sports'].includes(category)) {
        throw new Error('Categoria inválida');
    }

    name = name.charAt(0).toUpperCase() + name.slice(1)
    description = description.charAt(0).toUpperCase() + description.slice(1)
    category = firstName.charAt(0).toUpperCase() + firstName.slice(1)

    const productExiste = await Product.findOne({ name })

    if (productExiste) {
        res.status(400)
        throw new Error(`Ya existe un registro para este producto: ${name}, por favor intenta con otro nombre`)
    }

    const product = await Product.create({
        name,
        description,
        category,
        price,
        image
    })

    if (product) {
        res.status(201).json({
            _id: product.id,
            name,
            description,
            category,
            price,
            image,
            message: 'Producto registrado exitosamente'
        })
    } else {
        res.status(400)
        throw new Error('No se pudo agregar el producto')
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
    registerProduct,
    updateProduct,
    getOneProduct,
    getProducts,
    deleteProduct
}