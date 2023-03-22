const express = require('express')
const router = express.Router()
const {
    setOrder,
    updateOrder,
    getOneOrder,
    getOrders,
    deleteOrder
} = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')


router.post('/create', protect, setOrder)
router.put('/update/:id', protect, updateOrder)
router.get('/get/:id', protect, getOneOrder)
router.get('/get', protect, getOrders)
router.delete('/delete/:id', protect, deleteOrder)

module.exports = router