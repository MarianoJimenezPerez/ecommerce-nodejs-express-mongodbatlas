const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: String,
    products: Array
});

module.exports = mongoose.model('categorys', categorySchema);