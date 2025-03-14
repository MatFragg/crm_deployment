const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/clients', auth, role(['admin']), clientController.newClient);
router.get('/clients', auth, role(['admin', 'seller']), clientController.showClients);
router.get('/clients/:id', auth, role(['admin', 'seller']), clientController.showClientById);
router.put('/clients/:id', auth, clientController.updateClient);
router.delete('/clients/:id', auth, clientController.deleteClient);

module.exports = router;