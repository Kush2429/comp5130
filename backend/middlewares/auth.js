const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyUser = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

exports.verifyAdmin = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
