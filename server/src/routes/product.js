const express = require('express');
const { getAllProducts, getProductById, createProduct, deleteProduct, searchProducts, updateProduct, updateProductStatus} = require('../controller/products');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.get('/products', auth, getAllProducts);
router.get('/products/:id', auth, getProductById);
router.post('/products', auth, createProduct);
router.delete('/products/:id', auth, deleteProduct);
router.get('/products/search', auth, searchProducts);
router.put('/products/:id', auth, updateProduct);
router.put('/products/:id/status', auth, updateProductStatus);

module.exports = router;
