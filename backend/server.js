const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const port = process.env.PORT 

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/ecommerce/user', require('./routes/userRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))