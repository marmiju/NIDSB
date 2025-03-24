import jwt from 'jsonwebtoken';
import db from '../../database/DB.js';
import dotenv from 'dotenv';

dotenv.config();

const sqlLogin = "SELECT * FROM `users` WHERE `email` = ? AND `pass` = ?";

export function Login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    db.query(sqlLogin, [handler, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        if (result.length === 0) {
            return res.status(401).json({ message: "Oops! Username and password Don't match" });
        }
        const user = result[0];
        try {
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: "Login successful", token });
        } catch (err) {
            return res.status(500).json({ message: "Token generation error", error: err.message });
        }
    });
}
