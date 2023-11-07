const db = require('../database/db');

class registerModel {
  // Método para registrar un usuario
  static registerUser(email, username, password, callback) {
    const query = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
    db.query(query, [email, username, password], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
}

class obtenerModel{
    static obtenerUser(callback){
      const query = 'SELECT * FROM users'
      db.query(query,callback);
    }
  }

module.exports = {registerModel,obtenerModel };
