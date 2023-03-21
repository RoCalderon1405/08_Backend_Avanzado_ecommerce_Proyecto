const express = require('express')
const router = express.Router()
const { 
    setOrder,
    updateOrder 
} = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')


router.post('/create', protect, setOrder)
router.put('/update/:id', protect, updateOrder)


module.exports = router