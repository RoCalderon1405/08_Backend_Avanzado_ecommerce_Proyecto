const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')



const registerUser = asyncHandler(async (req, res) => {

    let { firstName, lastName, email, password, address, phoneNumber, role } = req.body

    if (!firstName) {
        res.status(400)
        throw new Error('Favor de verificar el nombre')
    }
    if (!lastName) {
        res.status(400)
        throw new Error('Favor de verificar el apellido')
    }
    if (!email) {
        res.status(400)
        throw new Error('Favor de verificar el email')
    }
    if (!password) {
        res.status(400)
        throw new Error('Favor de verificar el password')
    }
    if (!address) {
        res.status(400)
        throw new Error('Favor de verificar la dirección')
    }
    if (!phoneNumber) {
        res.status(400)
        throw new Error('Favor de verificar el número telefónico')
    }
    if (!role) {
        res.status(400)
        throw new Error('Favor de verificar el tipo de usuario')
    }

    // Convertir la primera letra a mayúscula
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    address = address.charAt(0).toUpperCase() + address.slice(1)

    const userExiste = await User.findOne({ email })

    if (userExiste) {
        res.status(400)
        throw new Error(`Ya existe un registro para este email ${email}`)
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phoneNumber,
        role
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber,
            role: user.role,
            message: 'Usuario registrado'
        })
    } else {
        res.status(400)
        throw new Error('No se pudo agregar el usuario')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

const updateUser = asyncHandler(async (req, res) => {

    const usuario = await User.findById(req.params.id)

    if (!usuario) {
        res.status(400)
        throw new Error('Usuario no encontrado')
    }

    //verificamos que el user de la tarea sea igual que el user del token
    // console.log(usuario.id)
    // console.log(req.user.id)
    if (usuario.id !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedUser)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const dataUser = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, email, address, phoneNumber, role } = req.user

    res.status(200).json({
        _id,
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        role
    })
})

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    dataUser
}