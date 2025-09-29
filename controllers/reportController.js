const db = require('../config/db');

// === INNER JOIN: Users with their roles ===
exports.usersWithRoles = (req, res) => {
  const sql = `
    SELECT u.id, u.username, u.email, r.role_name 
    FROM users u 
    INNER JOIN user_roles ur ON u.id = ur.user_id 
    INNER JOIN roles r ON ur.role_id = r.id
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === LEFT JOIN: All users with their profiles (if exists) ===
exports.usersWithProfiles = (req, res) => {
  const sql = `
    SELECT u.id, u.username, u.email, p.first_name, p.last_name, p.bio 
    FROM users u 
    LEFT JOIN profiles p ON u.id = p.user_id
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === RIGHT JOIN: All roles with assigned users ===
exports.rolesRightJoin = (req, res) => {
  const sql = `
    SELECT r.role_name, u.username, u.email 
    FROM users u 
    RIGHT JOIN user_roles ur ON u.id = ur.user_id 
    RIGHT JOIN roles r ON ur.role_id = r.id
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === FULL OUTER (UNION): All users and profiles combination ===
exports.profilesFullOuter = (req, res) => {
  const sql = `
    SELECT u.id as user_id, u.username, p.id as profile_id, p.first_name, p.last_name 
    FROM users u 
    LEFT JOIN profiles p ON u.id = p.user_id
    UNION
    SELECT u.id as user_id, u.username, p.id as profile_id, p.first_name, p.last_name 
    FROM users u 
    RIGHT JOIN profiles p ON u.id = p.user_id
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === CROSS JOIN: All possible user-role combinations ===
exports.userRoleCombos = (req, res) => {
  const sql = `
    SELECT u.username, r.role_name 
    FROM users u 
    CROSS JOIN roles r
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === SELF JOIN: User referrals ===
exports.referrals = (req, res) => {
  const sql = `
    SELECT u1.username as referrer, u2.username as referred_user, u2.email as referred_email 
    FROM users u1 
    INNER JOIN users u2 ON u1.id = u2.referred_by 
    WHERE u2.referred_by IS NOT NULL
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === Latest login per user ===
exports.latestLogin = (req, res) => {
  const sql = `
    SELECT u.username, u.email, ll.login_time 
    FROM users u 
    LEFT JOIN (
      SELECT user_id, MAX(login_time) as login_time 
      FROM user_logins 
      GROUP BY user_id
    ) ll ON u.id = ll.user_id
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};