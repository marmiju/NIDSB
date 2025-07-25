const db = require('../../database/DB');

const getQuery = `select * from notices`;

function getNotices(req, res) {
    try {
        db.query(getQuery, (err, result) => {
            if (err) return res.status(500).json({ message: 'Failed to fetch data', err });
            res.status(200).json({ result });
        });
    } catch (c) {
        res.status(500).json({ error: c });
    }
}

module.exports = getNotices;
