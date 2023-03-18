const express = require('express')
const router = express.Router()
const { registerUser, loginUser, updateUser, dataUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


router.get('/data', protect, dataUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update/:id', protect, updateUser)
// router.delete('/delete/:id', protect, deleteUser)

module.exports = router