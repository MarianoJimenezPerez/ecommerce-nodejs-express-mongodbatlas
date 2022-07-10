const product = require('../models/product');

const getAllProducts = async (req, res, next) => {
    const products = await product.find({});
    return res.render('index', {products})
};

const getProductById = async (req, res, next) => {
    try{
        const idP = req.params.id;
        const p = await product.findOne({'_id': idP});
        return res.render('product', {p});
    } catch(err){
        console.log(err)
    }
};

module.exports = { getAllProducts, getProductById };
