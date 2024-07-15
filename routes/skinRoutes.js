const express = require('express');
const router = express.Router();
const skinController = require('../controllers/skinController');

router.get('/', skinController.getAllSkins);
router.post('/skins', skinController.addSkin);

// Outras rotas (put, delete, etc.) podem ser adicionadas aqui

module.exports = router;
