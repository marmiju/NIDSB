const db = require('../../database/DB');

const insertQuery = `insert into notices(title, description, author, date) values (?, ?, ?, ?)`;

function AddNotice(req, res) {
    const { title, desc, author } = req.body;

    if (!title || !desc || !author) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const now = new Date();
    const dateOnly = now.toISOString().split("T")[0]; // e.g., "2025-05-12"

    try {
        db.query(insertQuery, [title, desc, author, dateOnly], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Data insert failed!', err });
            }
            res.status(200).json({ message: 'Data inserted successfully', result });
        });
    } catch (c) {
        res.status(500).json({ error: c });
    }
}

module.exports = AddNotice;
