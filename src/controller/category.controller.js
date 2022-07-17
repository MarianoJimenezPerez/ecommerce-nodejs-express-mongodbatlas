const product = require('../models/product');
const category = require('../models/category');

const getProducsByCategory = async (req, res, next) => {
    let products = [];
    try{
        //buscar la categoria solicitada
        const nameC = req.params.name;

        const cat = await category.findOne({'name': nameC});

        //escanear los productos dentro de la categoria solicitada
        for(let i = 0; i < cat.products.length; i++){
            let p = await product.findOne({'_id': cat.products[i]});
            products.push(p)
        }

        return res.render('category', {products});

    } catch(err){
        console.log(err)
    }
};

module.exports = { getProducsByCategory };