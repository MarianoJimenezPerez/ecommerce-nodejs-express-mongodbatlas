const router = require('express').Router();
const passport = require('passport');
const {getAllProducts, getProductById} = require('../controller/product.controller.js');


router.get('/', getAllProducts);
router.get('/:id', getProductById);

/* USER ACC */

module.exports = router;