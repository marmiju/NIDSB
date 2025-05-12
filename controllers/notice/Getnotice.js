import db from "../../database/DB.js";

// SELECT * FROM `notices` WHERE 1
const getQuery = `select * from notices`

export function getNotices(req, res) {


    try {
        
        db.query(getQuery, (err, result) => {
            if (err) return res.status(500).json({ message: 'failed to fetch data',err })   
                res.status(200).json({result })
            })
    } catch (c) {
         res.json({c})
        }
    
    
}