const router = require('express').Router();
const {getProducsByCategory} = require('../controller/category.controller.js');


router.get('/:name', getProducsByCategory);


module.exports = router;