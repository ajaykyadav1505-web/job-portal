const pool = require("../config/db");

/**
 * Candidate saves a job
 */
exports.saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    await pool.query(
      "INSERT INTO favourites(user_id, job_id) VALUES ($1,$2)",
      [req.user.user_id, jobId]
    );

    res.json({ message: "Saved successfully" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Already saved" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Candidate removes saved job
 */
exports.removeJob = async (req, res) => {
  await pool.query(
    "DELETE FROM favourites WHERE user_id=$1 AND job_id=$2",
    [req.user.user_id, req.params.jobId]
  );

  res.json({ message: "Removed successfully" });
};

/**
 * Candidate views saved jobs
 */
exports.myFavourites = async (req, res) => {
  const result = await pool.query(`
    SELECT 
      jobs.job_id,
      jobs.title,
      jobs.location,
      jobs.job_type,
      jobs.description,
      favourites.saved_at
    FROM favourites
    JOIN jobs ON jobs.job_id = favourites.job_id
    WHERE favourites.user_id = $1
    ORDER BY favourites.saved_at DESC
  `, [req.user.user_id]);

  res.json(result.rows);
};
