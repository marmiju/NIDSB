const db = require('../../database/DB');

function GetContestRanking(req, res) {
    const { contest_id } = req.body;

    const query = `
       SELECT 
        s.user_id,
        u.username,
        SUM(s.max_point) AS total_point,
        COUNT(s.problem_id) AS total_problems,
        stats.total_submissions,
        stats.accepted_submissions,
        ROUND(
            (stats.accepted_submissions / stats.total_submissions) * 100,
            2
        ) AS acceptance_rate,
        ap.accepted_problem_ids
    FROM (
        SELECT 
            user_id,
            problem_id,
            MAX(point) AS max_point
        FROM submission
        WHERE contest_id = ?
        GROUP BY user_id, problem_id
    ) s
    JOIN users u ON u.id = s.user_id
    JOIN (
        SELECT 
            user_id,
            COUNT(*) AS total_submissions,
            SUM(isAccepted) AS accepted_submissions
        FROM submission
        WHERE contest_id = ?
        GROUP BY user_id
    ) stats ON stats.user_id = s.user_id
    LEFT JOIN (
        SELECT 
            user_id,
            GROUP_CONCAT(DISTINCT problem_id ORDER BY problem_id) AS accepted_problem_ids
        FROM submission
        WHERE contest_id = ? AND isAccepted = 1
        GROUP BY user_id
    ) ap ON ap.user_id = s.user_id
    GROUP BY s.user_id
    ORDER BY total_point DESC
    LIMIT 0, 25;
    `;

    db.query(query, [contest_id, contest_id, contest_id], (err, result) => {
        if (err) {
            console.error("Ranking Fetch Error:", err);
            return res.status(500).json({ message: "Error fetching rankings" });
        }

        res.status(200).json({
            contest_id: contest_id,
            rankings: result,
        });
    });
}

module.exports = GetContestRanking;
