const router = require('express').Router();
const passport = require('passport');
const {isAuthenticated} = require('../controller/user.controller.js');
const {getAllProducts, getProductById, addProduct} = require('../controller/product.controller.js');


router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/add', isAuthenticated, addProduct);

/* USER ACC */

module.exports = router;