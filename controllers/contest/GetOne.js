const db = require('../../database/DB');

function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const GetOne = async (req, res) => {
    const { id } = req.body;
    try {
        const contests = await queryAsync("SELECT * FROM contest WHERE id = ?", [id]);

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

module.exports = GetOne;
