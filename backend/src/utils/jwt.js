const jwt = require('jsonwebtoken');

function signAccess(user){ // short lived
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m' });
}
function signRefresh(user){
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES || '30d' });
}
function verifyAccess(token){
  return jwt.verify(token, process.env.JWT_SECRET);
}
function verifyRefresh(token){
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}
module.exports = { signAccess, signRefresh, verifyAccess, verifyRefresh };
