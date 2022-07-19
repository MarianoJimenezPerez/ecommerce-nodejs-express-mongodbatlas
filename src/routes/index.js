const router = require('express').Router();
const {isAuthenticated} = require('../controller/user.controller.js');
const {getAllProducts, getAddForm, addProduct, pushProductToDB, getCart, getCheckOut, getProductById} = require('../controller/product.controller.js');


router.get('/', getAllProducts);
router.post('/add', isAuthenticated, addProduct);
router.get('/write-product', getAddForm);
router.post('/write-product', pushProductToDB);
router.get('/my-cart', isAuthenticated, getCart);
router.post('/send-order', isAuthenticated, getCheckOut);
router.get('/support', (req, res) => {
    res.render('support');
});
router.get('/:id', isAuthenticated, getProductById);

/* USER ACC */

module.exports = router;