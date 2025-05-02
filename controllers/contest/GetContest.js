import db from '../../database/DB.js';

function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

export default async function GetAllContests(req, res) {
    try {
        
        const contests = await queryAsync("SELECT * FROM contest ORDER BY end_time DESC");
        console.log('hello')
        console.log("Contests fetched:", contests.length);

        // Step 2: For each contest, fetch its problems and test cases
        for (const contest of contests) {
            const problems = await queryAsync("SELECT * FROM problems WHERE contest_id = ?", [contest.id]);
            contest.problems = problems;
        }

        // Step 3: Respond with all contests
        res.status(200).json(contests);

    } catch (err) {
        console.error("Error fetching contests:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
}

