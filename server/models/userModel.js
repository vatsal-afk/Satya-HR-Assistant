const db = require('../config/database');

const getUserByEmail = (email, callback) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        callback(err, user);
    });
};

module.exports = {
    getUserByEmail
};
