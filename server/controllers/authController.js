const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const JWT_SECRET = 'your_jwt_secret_key';

// Signup
exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, hashedPassword], function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ id: this.lastID, name, email });
        });
    });
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ message: 'Login successful', token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        });
    });
};
