import db from '../../database/DB.js';

const getuserSql = "SELECT * FROM `users` WHERE `role` = 'student'";

export default function getUsers(req, res) {
    db.query(getuserSql, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database Error - getUsers - 10' });
        }
        return res.status(200).json({ result });
    });
}
