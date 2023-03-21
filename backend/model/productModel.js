const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Product', productSchema);