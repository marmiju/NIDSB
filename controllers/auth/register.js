import db from '../../database/DB.js';

const sqlInsertUser = `
  INSERT INTO users (name, username, email, phone, password, role,status,semester,createdAt)
  VALUES (?, ?,?,?,?,?,?,?,?)
`;
const sqlCheckUser = `
  SELECT * FROM users WHERE username = ? OR email = ?
`;

// export function Createtable(req, res) {
//     const sql = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(100),
//       username VARCHAR(50) UNIQUE,
//       email VARCHAR(100) UNIQUE,
//       phone VARCHAR(20),
//       password VARCHAR(255),
//       role ENUM('client', 'student', 'teacher') NOT NULL,
//       status ENUM('pending', 'approved', 'rejected', 'active') DEFAULT 'pending',
//       semester VARCHAR(20),
//       result VARCHAR(20),
//       contestPoints INT DEFAULT 0,
//       rank INT DEFAULT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//   `;

//     db.query(sql, (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Table creation failed', error: err.message });
//         }
//         res.status(200).json({ message: 'Users table created successfully!' });
//     });
// }

export function Register(req, res) {
    const { name, username, email, phone, password, role, semester } = req.body;

    const createdAt = Date.now();  // Current timestamp for createdAt
    console.log(role, semester, createdAt)

    db.query(sqlCheckUser, [username, email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed', error: err.message });
        }

        if (result.length > 0) {
            const existingUser = result[0];
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        // Auto-approve if client, else set pending
        const userRole = role === 'guest' ? 'client' : role
        const userStatus = userRole === 'client' ? 'approved' : 'pending';

        const user = [
            name,
            username,
            email,
            phone,
            password,
            userRole,
            userStatus,
            semester,
            createdAt
        ];

        db.query(sqlInsertUser, user, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to insert user', error: err.message });
            }
            return res.status(200).json({ message: 'Account created!', result })
        });
    });
}


