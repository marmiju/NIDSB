import db from '../../database/DB.js'

const gettingquery = `SELECT * FROM infoTable WHERE 1`

export function getInfo(req, res) {
    
    db.query(gettingquery, (err, result) => {
        if (err) return res.status(500).json({ massage: 'failed to fetch Data', err })
        res.status(200).json({message: 'Succesfully data fetches', result})
    })
}