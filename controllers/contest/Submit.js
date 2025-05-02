import db from '../../database/DB.js';

const submitsql = "INSERT INTO submission (user_id,contest_id,problem_id,isAccepted,point) VALUES (?,?,?,?,?)"

export default  function Submit(req, res) {
    const { user_id, contest_id, problem_id, isAccepted } = req.body
    try {
        db.query(submitsql, [user_id, contest_id, problem_id, isAccepted, isAccepted ? 100 : 0])
        res.status(200).json({ message: "Submission received" });
    } catch (err) {
        res.status(501).json({message: "Submission Failed"})
    }
     
}