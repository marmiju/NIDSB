import db from '../../database/DB.js';
import jwt from 'jsonwebtoken';


const submitsql = "INSERT INTO submission (user_id,contest_id,problem_id,isAccepted,point) VALUES (?,?,?,?,?)"

export default function Submit(req, res) {
    const { token, contest_id, problem_id, isAccepted } = req.body;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    let decode;
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET); // use your actual secret
    } catch (err) {
        console.log('hello')
        return res.status(403).json({ message: "Invalid or expired token! Please Log In Again \n this Data Not Stored" });
    }

    const user_id = decode.userId;
    console.log(user_id, contest_id, problem_id, isAccepted);

    try {
        db.query(
            submitsql,
            [user_id, contest_id, problem_id, isAccepted, isAccepted ? 100 : 0],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Submission Failed" });
                }
                res.status(200).json({ message: "Submission received" });
            }
        );
    } catch (err) {
        res.status(500).json({ message: "Unexpected Server Error" });
    }
}

