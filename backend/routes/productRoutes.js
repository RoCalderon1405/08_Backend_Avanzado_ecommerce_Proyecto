const express = require('express')
const router = express.Router()
const { 
    registerProduct, 
    updateProduct, 
    getOneProduct, 
    getProducts,
    deleteProduct } = require('../controllers/productController')
const { isAdmin, protect } = require('../middleware/authMiddleware')


router.get('/getOneProduct/:id', getOneProduct)
router.get('/getProducts/', getProducts)
router.post('/register', registerProduct)
router.put('/update/:id', protect, isAdmin, updateProduct)
router.delete('/delete/:id', protect, isAdmin, deleteProduct)

module.exports = router