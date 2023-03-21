const express = require('express')
const router = express.Router()
const { 
    setOrder 
} = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')


router.post('/createOrder', protect, setOrder)


module.exports = router