const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/userController");

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/listar', AuthController.obtenerUsuarios);

module.exports = router;