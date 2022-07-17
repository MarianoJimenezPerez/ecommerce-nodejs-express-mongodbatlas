const product = require('../models/product');
const user = require('../models/user');
const cart = require('../models/cart');
const category = require('../models/category');
const { sendEmailOrder } = require('../utils/sendMail')

const getAllProducts = async (req, res, next) => {
    const products = await product.find({});
    if(req.isAuthenticated()){
        //get DB user
        let userId = req.session.passport.user;
        let u = await user.findOne({'_id': userId});

        //get cart user
        let uCartId = u.cartId;
        let uCart = await cart.findOne({'_id': uCartId});

        return res.render('index', {products: products})
    }
    return res.render('index', {products: products})
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
    let p = await product.findOne({"_id": idP});
    let u = await user.findOne({"_id": userId});

    if(p != null){

        await cart.updateOne({ '_id': u.cartId }, {$push: {products: p} })
        res.redirect('/my-cart');
    }

    res.redirect('/');
};

const getAddForm = async (req, res, next) => {
    try{
        return res.render('addProduct');
    } catch(err){
        console.log(err)
    }
};

const pushProductToDB = async (req, res, next) => {
    try{
        let b = req.body;
        console.log(b);
        //create the new product
        let newProduct = {
            category: b.category.toLowerCase(),
            description: b.description,
            name: b.name,
            price: b.price,
            stock: b.stock,
            thumbnail: b.thumbnail
        }

        //validating if the product category exist
        let cat = await category.findOne({"name" : b.category.toLowerCase()});

        if(cat != null){

            //create the new product and add to existing category
            let newInsert = await product.create(newProduct);
            await category.updateOne({ "_id": cat._id }, { $push: { products: newInsert._id } });
            return res.redirect('/');

        } else {

            let newInsert = await product.create(newProduct);
            //create the new product with new category
            let newCategory = {
                name: b.category,
                products: [newInsert._id]
            }

            await category.create(newCategory);

            return res.redirect('/');
        }
    } catch(err){
        console.log(err)
    }
};

const getCart = async (req, res, next) => {
    try{
        let total = 0;

        //get DB user
        let userId = req.session.passport.user;
        let u = await user.findOne({'_id': userId});

        //get cart user
        let uCartId = u.cartId;
        let uCart = await cart.findOne({'_id': uCartId});

        let products = uCart.products;

        for(let i = 0; i < products.length; i++){
            let pr = products[i].price;
            total = total + pr;
        }

        return res.render('cart', {products: products, total: total});
    } catch(err){
        console.log(err)
    }
};

const getCheckOut = async (req, res, next) => {
    try{
        //get DB user
        let userId = req.session.passport.user;
        let u = await user.findOne({'_id': userId});

        //get cart user
        let uCartId = u.cartId;
        let uCart = await cart.findOne({'_id': uCartId});

        //update stock of products
        for(let i = 0; i < uCart.products.length; i++){
            let idP = uCart.products[i]._id;
            let p = await product.findOne({'_id': idP});
            let newStock = p.stock - 1;
            
            await product.updateOne({ "_id": idP }, { stock: newStock } );
        }

        //send email with order info
        let info = await sendEmailOrder(u.email, "Nueva orden solicitada", JSON.stringify(uCart.products));

        //clean cart
        await cart.updateOne({ "_id": uCartId }, { products: [] });
        
        res.render('checkout', {info});

    } catch(err){
        console.log(err)
    }
};

module.exports = { getAllProducts, getProductById, getAddForm, addProduct, pushProductToDB, getCart, getCheckOut };
