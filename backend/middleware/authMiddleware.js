const jwt = require('jsonwebtoken');

  const authenticateToken = (req, res, next) => {
    
    const token = req.header('Authorization') || req.header('authorization');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token,`111`, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  };

  module.exports = { authenticateToken };