const pool = require("../config/db");

/**
 * Candidate applies to a job (with resume URL)
 */
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { resume_url } = req.body;

    await pool.query(
      "INSERT INTO applications(user_id, job_id, resume_url) VALUES ($1,$2,$3)",
      [req.user.user_id, jobId, resume_url]
    );

    res.json({ message: "Applied successfully" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Already applied" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Candidate views his applied jobs
 */
exports.myApplications = async (req, res) => {
  const result = await pool.query(`
    SELECT 
      jobs.job_id,
      jobs.title,
      jobs.location,
      jobs.job_type,
      jobs.description,
      applications.application_id,
      applications.status,
      applications.applied_at,
      applications.resume_url
    FROM applications
    JOIN jobs ON jobs.job_id = applications.job_id
    WHERE applications.user_id = $1
    ORDER BY applications.applied_at DESC
  `, [req.user.user_id]);

  res.json(result.rows);
};

/**
 * Admin updates application status (shortlisted / rejected)
 */
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  await pool.query(
    "UPDATE applications SET status = $1 WHERE application_id = $2",
    [status, req.params.id]
  );

  res.json({ message: "Application status updated" });
};

/**
 * Admin views all applicants for a job (with resume link)
 */
exports.getApplicantsForJob = async (req, res) => {
  const result = await pool.query(`
    SELECT 
      applications.application_id,
      applications.status,
      applications.resume_url,
      users.name,
      users.email,
      applications.applied_at
    FROM applications
    JOIN users ON users.user_id = applications.user_id
    WHERE applications.job_id = $1
  `, [req.params.jobId]);

  res.json(result.rows);
};
