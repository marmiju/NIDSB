import db from '../../database/DB.js';

const sql = {
    insertcontestSql: "INSERT INTO contest (title, description) VALUES (?, ?)",
    insertProblemSql: "INSERT INTO problems (contest_id, title, description) VALUES (?, ?, ?)",
    insertTestCaseSql: "INSERT INTO test_cases (problem_id, input_text, expected_output) VALUES (?, ?, ?)"
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
    const { title, desc, problems, testcases } = req.body;

    if (!title || !desc || !problems || !testcases) {
        return res.status(400).json({ message: "Title, description, problems, and test cases are required." });
    }

    try {
        // Insert contest
        const contestResult = await queryAsync(sql.insertcontestSql, [title, desc]);
        const contestId = contestResult.insertId;

        // Insert each problem
        for (const problem of problems) {
            const problemResult = await queryAsync(sql.insertProblemSql, [contestId, problem.title, problem.desc]);
            const problemId = problemResult.insertId;

            // Insert test cases related to this problem
            for (const testcase of testcases) {
                await queryAsync(sql.insertTestCaseSql, [problemId, testcase.input, testcase.expected]);
            }
        }

        res.status(200).json({ message: "Contest created successfully", contestId });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: "Error occurred while creating contest", error: err });
    }
}
