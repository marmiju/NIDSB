import db from '../../database/DB.js';

const getuserSql = "SELECT * FROM `users`";

export default function getUsers(req, res) {
    const { role } = req.body
    db.query(getuserSql, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database Error ' });
        }
        return res.status(200).json({ result });
    });
}
