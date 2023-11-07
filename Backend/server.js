const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./database/db"); // Conexión a la base de datos
const AuthController = require("./controllers/userController");
const cors = require('cors');

app.use(bodyParser.json()); 
app.use(cors());
// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database");
  } else {
    console.log("Connected to the database");
  }
});

// Rutas de autenticación
app.post('/login', AuthController.login);
app.post('/register', AuthController.register);
app.get('/listar', AuthController.obtenerUsuarios);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});