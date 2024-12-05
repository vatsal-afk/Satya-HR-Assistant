const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'Access denied, no token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = decoded;  // Attach decoded token info to req
        next();
    });
};

module.exports = authenticateToken;
