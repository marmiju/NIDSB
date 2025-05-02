import db from '../../database/DB.js';

const sql = {
    insertcontestSql: "INSERT INTO contest (title, description, end_time) VALUES (?, ?, ?)",
    insertProblemSql: "INSERT INTO problems (contest_id, title, description,input,output) VALUES (?, ?, ?,?,?)",
   
};

// Wrap db.query into a Promise
function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

export default async function CreateContest(req, res) {
    const { title, description, end_time, problems} = req.body;

    if (!title || !description || !end_time || !problems ) {
        return res.status(400).json({ message: "Title, description, end_time, and problems are required." });
    }

    try {
        // Insert contest
        const contestResult = await queryAsync(sql.insertcontestSql, [title, description, end_time]);
        const contestId = contestResult.insertId;

        // Insert each problem
        for (const problem of problems) {
            const problemResult = await queryAsync(sql.insertProblemSql, [contestId, problem.title, problem.description,problem.input,problem.output]);
           
        }

        res.status(200).json({ message: "Contest created successfully", contestId });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: "Error occurred while creating contest", error: err });
    }
}
