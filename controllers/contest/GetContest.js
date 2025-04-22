import db from '../../database/DB.js';

function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

export default async function GetLatestContest(req, res) {
    try {
        // Step 1: Get the latest contest
        const [latestContest] = await queryAsync("SELECT * FROM contest ORDER BY id DESC LIMIT 1");
        if (!latestContest) {
            return res.status(404).json({ message: "No contests found" });
        }

        // Step 2: Get problems for this contest
        const problems = await queryAsync("SELECT * FROM problems WHERE contest_id = ?", [latestContest.id]);

        // Step 3: Attach test cases to each problem
        for (const problem of problems) {
            const testcases = await queryAsync("SELECT * FROM test_cases WHERE problem_id = ?", [problem.id]);
            problem.testcases = testcases;
        }

        // Step 4: Combine and respond
        latestContest.problems = problems;
        res.status(200).json(latestContest);

    } catch (err) {
        console.error("Error fetching latest contest:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
}
