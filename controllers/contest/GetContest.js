const db = require('../../database/DB');

function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const GetAllContests = async (req, res) => {
    try {
        console.log('hello');
        const contests = await queryAsync("SELECT * FROM contest ORDER BY end_time DESC");
        console.log("Contests fetched:", contests.length);

        for (const contest of contests) {
            const problems = await queryAsync("SELECT * FROM problems WHERE contest_id = ?", [contest.id]);
            contest.problems = problems;
        }

        res.status(200).json(contests);

    } catch (err) {
        console.error("Error fetching contests:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

module.exports = GetAllContests;
