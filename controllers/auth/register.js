const db = require('../../database/DB.js');
const bcrypt = require('bcrypt'); // spelling ঠিক করলাম

const sqlInsertUser = `
  INSERT INTO users (name, username, email, phone, password, role, status, semester, createdAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const sqlCheckUser = `
  SELECT * FROM users WHERE username = ? OR email = ?
`;

function Register(req, res) {
  const { name, username, email, phone, password, role, semester } = req.body;

  if (!name || !username || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const createdAt = Date.now().toString();

  // Check if username or email already exists
  db.query(sqlCheckUser, [username, email], (err, existingUsers) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (existingUsers.length > 0) {
      const existing = existingUsers[0];
      if (existing.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existing.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const userRole = role === 'guest' ? 'client' : role;
    const userStatus = 'approved';

    // Hash password using then()
    bcrypt.hash(password, 10).then((hashedPassword) => {
      const newUser = [
        name,
        username,
        email,
        phone,
        hashedPassword,
        userRole,
        userStatus,
        semester || '',
        createdAt
      ];

      db.query(sqlInsertUser, newUser, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to register user', error: err.message });
        }

        return res.status(201).json({
          message: 'Account created successfully!',
          userId: result.insertId
        });
      });
    }).catch((hashErr) => {
      return res.status(500).json({ message: 'Password hashing failed', error: hashErr.message });
    });
  });
}

module.exports = Register;
