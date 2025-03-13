const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

const auth = require('../middleware/auth');
const role = require('../middleware/role');
module.exports = function () {
    // Orders
    router.post('/orders/:id',auth,role(['admin','seller']),orderController.newOrders);
    router.get('/orders',auth,role(['admin','seller']),orderController.showOrders);
    router.get('/orders/:id',auth,role(['admin','seller']),orderController.showOrdersById);
    router.put('/orders/:id',auth,role(['admin','seller']),orderController.updateOrders);
    router.delete('/orders/:id',auth,role(['admin','seller']),orderController.deleteOrders);

    return router;
}