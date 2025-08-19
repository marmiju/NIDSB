const db = require('../../database/DB.js');

const getuserSql = "SELECT * FROM `users` WHERE `role` = 'teacher'";

function getUsers(req, res) {
  const { role } = req.body
  console.log(role)
  db.query(getuserSql, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Database Error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const withoutPassword = result.map(user => {
      const { password, ...rest } = user;
      return rest;
    });
    // get first user without password

    return res.status(200).json({ user: withoutPassword });
  });

}

module.exports = getUsers;
