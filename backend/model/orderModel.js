const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    orderItems: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        category: {
            type: String,
            required: true,
            enum : ['Electronics', 'Clothing', 'Shoes', 'Books', 'Home', 'Sports']
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }]
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Order', orderSchema);