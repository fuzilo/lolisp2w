const express = require('express');
const router = express.Router();
const skinController = require('../controllers/skinController');



router.get('/', skinController.getAllSkins);
router.post('/', skinController.addSkin);
router.get('/:id', skinController.getSkinById);
router.put('/:id', skinController.updateSkin);
router.delete('/:id', skinController.deleteSkin)

// Outras rotas (put, delete, etc.) podem ser adicionadas aqui

module.exports = router;
