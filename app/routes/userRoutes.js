const express = require('express');
const router = express.Router();
const {register, login,updateUser} = require('../controllers/userController');
const {validateRegister} = require('../middleware/userValidator');

router.post('/register', validateRegister, register);
router.post('/login', login);
router.put('/updateUser', updateUser);

module.exports = router;


