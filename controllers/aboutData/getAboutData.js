const db = require('../../database/DB');

const sql = {
    about: `select * from about_us limit 1`,
    programs: `select * from programs limit 1`,
    program: `select * from program_details`,
    achivement: `select * from achievements`,
    goals: `select * from goals`
};

function getAbout(req, res) {
    db.query(sql.about, (err, aboutResult) => {
        if (err) return res.status(500).json({ err });

        const allData = {};
        const about = aboutResult[0];

        allData.title = about.title;
        allData.image = about.image;
        allData.desc = about.description;

        db.query(sql.programs, (err, programsResult) => {
            if (err) return res.status(500).json({ err });

            const programs = programsResult[0];

            allData.programs = {
                title: programs.title,
                desc: programs.description,
                programs: []
            };

            db.query(sql.program, (err, programResult) => {
                if (err) return res.status(500).json({ err });

                allData.programs.programs = programResult.map(program => ({
                    title: program.title,
                    desc: program.description,
                    image: program.image,
                    slogan: program.slogan || ''
                }));

                db.query(sql.achivement, (err, achivementResult) => {
                    if (err) return res.status(500).json({ err });

                    allData.achivement = achivementResult.map(ach => ({
                        title: ach.title,
                        desc: ach.description,
                        position: ach.position,
                        image: ach.image
                    }));

                    db.query(sql.goals, (err, goalResult) => {
                        if (err) return res.status(500).json({ err });

                        allData.goal = goalResult.map(g => ({
                            title: g.title,
                            desc: g.description
                        }));

                        return res.status(200).json({ allData });
                    });
                });
            });
        });
    });
}

module.exports = getAbout;
