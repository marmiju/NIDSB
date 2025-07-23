import db from "../../database/DB.js";

// INSERT INTO `notices`(`id`, `title`, `description`, `author`, `date`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]')
const insertQuery = `insert into notices(title,description,author,date) values (?,?,?,?)`

export default function AddNotice(req, res) {
    const { title, desc, author } = req.body
    if (!title | !desc | !author) return res.json({ message: 'required all field' })
        const now = new Date();
    const dateOnly = now.toISOString().split("T")[0]; // e.g., "2025-05-12"
    
    try {
        
        db.query(insertQuery, [title, desc, author, dateOnly], (err, result) => {
            if (err) return res.status(500).json({ message: 'Data insert failed!',err })
                
                res.status(200).json({ message: 'Data insert successfully ', result })
            })
    } catch (c) {
         res.json({c})
        }
    
    
}