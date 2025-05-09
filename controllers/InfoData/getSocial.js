import db from '../../database/DB.js';

const gettingQuery = `SELECT * FROM socialMedia`;

export default function getSocial() {
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
