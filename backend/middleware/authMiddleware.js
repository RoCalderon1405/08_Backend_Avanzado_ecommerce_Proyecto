const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Obtenemos el token
            token = req.headers.authorization.split(' ')[1]

            //verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtenemos los datos del usuario del mismo token
            req.user = await User.findById(decoded.id).select('-password')

            // Permitimos el acceso si el usuario es un administrador
            if (req.user.role === 'ADMIN') {
                return next()
            }

            // Si no es un administrador, continua con la verificación normal

            next()
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('Token Incorrecto')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Sin token')
    }

})

const isAdmin = asyncHandler(async (req, res, next) => {

    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(401);
        throw new Error('No autorizado como administrador');
    }

})


module.exports = {
    protect,
    isAdmin
}