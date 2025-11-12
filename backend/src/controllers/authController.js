const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signAccess, signRefresh, verifyRefresh } = require('../utils/jwt');

async function register(req, res){
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if(existing) return res.status(400).json({ message: 'Email exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  res.json({ id: user._id, email: user.email, name: user.name });
}

async function login(req, res){
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user);

  // Set refresh token as httpOnly cookie
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 30*24*60*60*1000 });
  res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

async function refresh(req, res){
  const token = req.cookies.refreshToken;
  if(!token) return res.status(401).json({ message: 'No refresh token' });
  try {
    const payload = verifyRefresh(token);
    const user = await User.findById(payload.id);
    if(!user) throw new Error('No user');
    const accessToken = signAccess(user);
    res.json({ accessToken });
  } catch(err){
    res.status(401).json({ message: 'Invalid refresh token' });
  }
}

async function logout(req, res){
  res.clearCookie('refreshToken');
  res.json({ ok: true });
}

module.exports = { register, login, refresh, logout };
