import db from "../../database/DB.js";

const insertQuery = `insert into socialMedia (title,link,icon) VALUES (?,?,?)`

export function inserSocialMedia(req, res){
    const { title, link, icon } = req.body;

    if (!title) {
         return res.status(201).json({ message: 'title are required!' })
    }
    if (!link) {
        return res.status(201).json({ message: 'link are required!' })
    }
    if (!icon) {
         return res.status(201).json({ message: 'icon are required!' })
    }
    
    db.query(insertQuery, [title, link, icon], (err, result) => {
        if (err) {
            return res.status(500).json({message:'Error insert Data', err})
        }    

        return res.status(200).json({message: 'Data Inserted Succesfully',result})
    })
}