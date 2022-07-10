const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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