const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/ecommerce/user', require('./routes/userRoutes'))
app.use('/ecommerce/products', require('./routes/productRoutes'))
app.use('/ecommerce/order', require('./routes/orderRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))