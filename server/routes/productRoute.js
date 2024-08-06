const express = require('express');
const { addProduct } = require('../controllers/productController');
const { getAllProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/products', addProduct);
router.get('/products', getAllProducts);

module.exports = router;