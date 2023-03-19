const express = require('express')
const router = express.Router()
const { registerUser, 
    loginUser, 
    updateUser, 
    dataUser, 
    dataAllUser,
    deleteUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


router.get('/me', protect, dataUser)
router.get('/dataAllUsers', dataAllUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update/:id', protect, updateUser)
router.delete('/delete/:id', protect, deleteUser)

module.exports = router