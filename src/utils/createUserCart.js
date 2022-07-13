const cart = require('../models/cart');

const createCart = async (idUser) => {
    try{
        const newCart = new cart();
        newCart.products = [];
        newCart.userId = idUser;
        await newCart.save();
        return newCart;

    } catch(err){
        console.log(err)
    }
};

module.exports = { createCart };