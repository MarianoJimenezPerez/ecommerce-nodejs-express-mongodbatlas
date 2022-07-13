const product = require('../models/product');
const user = require('../models/user');
const cart = require('../models/cart');

const getAllProducts = async (req, res, next) => {
    const products = await product.find({});
    if(req.isAuthenticated()){
        //get DB user
        let userId = req.session.passport.user;
        let u = await user.findOne({'_id': userId});

        //get cart user
        let uCartId = u.cartId;
        let uCart = await cart.findOne({'_id': uCartId});

        return res.render('index', {products: products, uCart: uCart})
    }
    return res.render('index', {products: products, uCart: ''})
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

const addProduct = async (req, res, next) => {
    let idP = req.body.productId;
    let userId = req.session.passport.user;
    let p = await product.findOne({'_id': idP});
    let u = await user.findOne({'_id': userId});

    //search for the cart from user id and update
    await cart.updateOne({ '_id': u.cartId }, {$push: {products: p} })

    res.redirect('/');
};

module.exports = { getAllProducts, getProductById, addProduct };
