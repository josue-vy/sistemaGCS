const {registerModel,obtenerModel} = require('../models/registerModel');
const loginModel = require('../models/loginModel');

class AuthController {
  // Controlador para el inicio de sesión
  static login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    loginModel.findByUsernameAndPassword(username, password, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(401).json({ message: "WRONG USERNAME OR PASSWORD!" });
      }
    });
  }

  // Controlador para el registro de usuario
  static register(req, res) { 
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    registerModel.registerUser(email, username, password, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else if (result.affectedRows > 0) {
        res.status(200).json(result);
      } else {
        res.status(400).json({ message: "ENTER CORRECT ASKED DETAILS!" });
      }
    });
  }

  static obtenerUsuarios(req, res) {
    obtenerModel.obtenerUser((error, usuarios) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener usuarios' });
      }
      res.status(200).json(usuarios);
    });
  }
}
module.exports = AuthController; // Corregido "module.export" a "module.exports"
