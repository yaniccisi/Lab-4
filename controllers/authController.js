const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

function signToken(user) {
  const jti = uuidv4().replace(/-/g, '').slice(0, 32);
  const payload = { 
    sub: user.id, 
    email: user.email, 
    role: user.role || 'student', 
    jti 
  };
  
  // Use environment variable or fallback
  const secret = process.env.JWT_SECRET || 'fallback_secret_key_change_me';
  const expiresIn = process.env.JWT_EXPIRES || '24h';
  
  const token = jwt.sign(payload, secret, { expiresIn });
  return { token, jti };
}

exports.signup = (req, res) => {
  const { email, password, full_name, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const hash = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [email, hash, full_name || null, role || 'student'], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Email already registered' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Signup successful', userId: result.insertId });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const sql = 'SELECT id, email, password_hash, role FROM users WHERE email = ? LIMIT 1';
  db.query(sql, [email], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const passwordValid = bcrypt.compareSync(password, user.password_hash);
    if (!passwordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const { token } = signToken(user);
    res.json({ 
      message: 'Login successful', 
      token, 
      profile: { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      } 
    });
  });
};

exports.logout = (req, res) => {
  // Simplified logout without token revocation
  res.json({ message: 'Logout successful' });
};

exports.profile = (req, res) => {
  res.json({ 
    id: req.user.id, 
    email: req.user.email, 
    role: req.user.role 
  });
};