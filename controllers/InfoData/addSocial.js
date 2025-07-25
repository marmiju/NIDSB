const db = require('../../database/DB');

const insertQuery = `insert into socialMedia (title, link, icon) VALUES (?, ?, ?)`;

function inserSocialMedia(req, res) {
    const { title, link, icon } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required!' });
    }
    if (!link) {
        return res.status(400).json({ message: 'Link is required!' });
    }
    if (!icon) {
        return res.status(400).json({ message: 'Icon is required!' });
    }

    db.query(insertQuery, [title, link, icon], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting data', err });
        }

        return res.status(200).json({ message: 'Data inserted successfully', result });
    });
}

module.exports = inserSocialMedia;
