    const db = require('../database/db');

    class loginModel {
      static findByUsernameAndPassword(username, password, callback) {
        const query = "SELECT * FROM users WHERE username = ? AND password = ?";
        db.query(query, [username, password], (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, result);
          }
        });
      }
    }
    
    module.exports = loginModel;
