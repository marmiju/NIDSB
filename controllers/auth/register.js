import db from '../../database/DB.js';

let sql = "INSERT INTO `users` (`name`, `username`, `email`, `phone`, `pass`) VALUES (?, ?, ?, ?, ?)";
let sqlCheckUser = "SELECT * FROM `users` WHERE `username` = ?";


export function Register(req, res) {
    const { name, handler, email, phone, password } = req.body

    let values = [name, handler, email, phone, password]; //take value from Users body

    db.query(sqlCheckUser, [handler], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed", error: err.message });
        }
        if (result.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Failed", error: err.message });
            }
            res.status(200).json({ message: "Inserted successfully", insertId: result.insertId });
        });

    })

}

