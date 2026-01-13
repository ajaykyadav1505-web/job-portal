const pool = require("../config/db");

exports.getApplicants = async (req, res) => {
  const result = await pool.query(`
    SELECT users.user_id, users.name, users.email
    FROM applications
    JOIN users ON users.user_id = applications.user_id
    WHERE applications.job_id = $1
  `, [req.params.jobId]);

  res.json(result.rows);
};
