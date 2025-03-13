const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const auth = require('../middleware/auth');
const role = require('../middleware/role');

module.exports = function() {
    router.post('/products',
        auth,
        role(['admin']),
        productController.uploadImage,
        productController.newProduct);
    router.get('/products',auth,role(['admin','seller']),productController.showProducts);
    router.get('/products/:id',auth,role(['admin','seller']),productController.showProductById);
    router.put('/products/:id',
        auth,
        role(['admin']),
        productController.uploadImage,
        productController.updateProduct);
    router.delete('/products/:id',auth,role(['admin']),productController.deleteProduct);
    router.post('/products/search/:query',auth,role(['admin','seller','client']),productController.searchProduct);
    return router;
}