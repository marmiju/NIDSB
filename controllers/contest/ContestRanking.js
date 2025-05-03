import db from "../../database/DB.js";

export default function GetContestRanking(req, res) {
    const { contest_id } = req.body;

    console.log("Ranking API Called for Contest ID:", contest_id);

    const query = `
        SELECT 
            s.user_id,
            u.username,
            SUM(s.max_point) AS total_point,
            COUNT(sub.submission_id) AS total_submissions
        FROM (
            SELECT 
                user_id,
                problem_id,
                MAX(point) AS max_point
            FROM submission
            WHERE contest_id = ?
            GROUP BY user_id, problem_id
        ) s
        JOIN submission sub 
            ON sub.user_id = s.user_id 
            AND sub.contest_id = ?
        JOIN users u 
            ON u.id = s.user_id
        GROUP BY s.user_id
        ORDER BY total_point DESC
    `;

    db.query(query, [contest_id, contest_id], (err, result) => {
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
