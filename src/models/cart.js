const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    products: Array,
    userId: String
});

module.exports = mongoose.model('cart', cartSchema);