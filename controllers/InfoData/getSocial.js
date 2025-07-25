const db = require('../../database/DB');

const gettingQuery = `SELECT * FROM socialMedia`;

function getSocial() {
    return new Promise((resolve, reject) => {
        db.query(gettingQuery, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = getSocial;
