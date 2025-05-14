import db from '../../database/DB.js'

const sql = {
    about: `select * from about_us limit 1`,
    programs: `select * from programs limit 1`,
    program: `select * from program_details`,
    achivement: `select * from achievements`,
    goals:`select * from goals`
}

export default async function getAbout(req, res) {
    
    
    db.query(sql.about, (err, aboutResult) => {
        const allData = {}
        if (err) return res.status(500).json({ err })
        const about = aboutResult[0]
        
        // about Data
        allData.title = about.title;
        allData.image = about.image;
        allData.desc = about.description;

        //programs
         db.query(sql.programs, (req, programsresult) => {
            if (err) return res.status(500).json({ err });
            const programs = programsresult[0]
            
            allData.programs = {
                title: programs.title,
                desc: programs.description,
                programs :[]
            }
             //Every single program
             db.query(sql.program, (err, programResult) => {
                
                 if (err) return res.status(500).json({ err });
                 allData.programs.programs = programResult.map(program => ({
                     title: program.title,
                     desc: program.description,
                     image: program.image,
                     slogan: program.slogan || ''
                 })); //single program loop
                
                db.query(sql.achivement, (err, achivementResult) => {
                    if (err) return res.status(500).json({ err });
                    allData.achivement = achivementResult.map(ach => ({
                        title: ach.title,
                        desc: ach.description,
                        position: ach.position,
                        image: ach.image
                    })); //end of single achivement loop

                    db.query(sql.goals, (err, goalResult) => {
                        if (err) return res.status(500).send(err);
                        allData.goal = goalResult.map(g => ({
                            title: g.title,
                            desc: g.description
                        }));///end of loop
                        return res.status(200).json({allData})
                        
                    })//end of goals
                    
               
                     
                }) //ending off achivemnet

                  
            }) //ending of single programs
              
        })///ending programs

    })///ending of about data
}
