import db from '../../database/DB.js';
import getSocial from './getSocial.js';

const gettingQuery = `SELECT * FROM infoTable`;

export default function getInfo(req, res) {
    db.query(gettingQuery, async (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to fetch data', error: err });
        }

        try {
            const social = await getSocial();
            res.status(200).json({
                message: 'Successfully fetched data',
                infoData: result[0],
                socialData: social
            });
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch social data', error });
        }
    });
}
