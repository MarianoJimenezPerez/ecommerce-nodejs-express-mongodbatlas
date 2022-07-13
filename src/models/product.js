const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    category: String,
    description: String,
    thumbnail: String,
    price: Number,
    stock: Number
});

module.exports = mongoose.model('product', productSchema);