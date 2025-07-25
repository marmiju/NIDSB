const jwt = require('jsonwebtoken');
const db = require('../../database/DB.js');
const dotenv = require('dotenv');

dotenv.config();

let User_id; // Global User_ID

const sqlLogin = "SELECT * FROM `users` WHERE `email` = ? AND `password` = ?";

function Login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    db.query(sqlLogin, [email, password], (err, result) => {
        console.log(email, password);
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error", error: err.message });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Oops! Email and password don't match" });
        }

        const user = result[0];
        try {
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
            User_id = user.id;
            console.log(User_id);
            res.status(200).json({ message: "Login successful", token });
        } catch (err) {
            console.error("Token generation error:", err);
            return res.status(500).json({ message: "Token generation error", error: err.message });
        }
    });
}

module.exports = Login;
