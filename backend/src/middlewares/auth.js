const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch(err){
    res.status(401).json({ message: 'Invalid token' });
  }
}

function requireAdmin(req, res, next){
  if(req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin required' });
}

module.exports = { verifyAccessToken, requireAdmin };
