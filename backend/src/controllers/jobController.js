const pool = require("../config/db");

/**
 * Admin creates a job
 */
exports.createJob = async (req, res) => {
  const { title, description, location, job_type } = req.body;

  await pool.query(
    "INSERT INTO jobs(title,description,location,job_type,created_by) VALUES($1,$2,$3,$4,$5)",
    [title, description, location, job_type, req.user.user_id]
  );

  res.json({ message: "Job created" });
};

/**
 * Public – list jobs with search, filters, pagination & sorting
 */
exports.getJobs = async (req, res) => {
  const { search, location, job_type, page = 1, sort = "new" } = req.query;
  const limit = 5;
  const offset = (page - 1) * limit;
  const order = sort === "old" ? "ASC" : "DESC";

  let query = "FROM jobs WHERE 1=1";
  let params = [];

  if (search) {
    params.push(`%${search}%`);
    query += ` AND title ILIKE $${params.length}`;
  }

  if (location) {
    params.push(location);
    query += ` AND location = $${params.length}`;
  }

  if (job_type) {
    params.push(job_type);
    query += ` AND job_type = $${params.length}`;
  }

  const jobs = await pool.query(
    `SELECT * ${query} ORDER BY created_at ${order} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  const total = await pool.query(`SELECT COUNT(*) ${query}`, params);

  res.json({
    jobs: jobs.rows,
    total: total.rows[0].count,
    page: Number(page)
  });
};

/**
 * Public – get single job details
 */
exports.getJobById = async (req, res) => {
  const job = await pool.query(
    "SELECT * FROM jobs WHERE job_id = $1",
    [req.params.id]
  );

  res.json(job.rows[0]);
};

/**
 * Admin – update job
 */
exports.updateJob = async (req, res) => {
  const { title, description, location, job_type } = req.body;

  await pool.query(
    "UPDATE jobs SET title=$1, description=$2, location=$3, job_type=$4 WHERE job_id=$5",
    [title, description, location, job_type, req.params.id]
  );

  res.json({ message: "Job updated" });
};

/**
 * Admin – delete job
 */
exports.deleteJob = async (req, res) => {
  await pool.query("DELETE FROM jobs WHERE job_id = $1", [req.params.id]);
  res.json({ message: "Job deleted" });
};
