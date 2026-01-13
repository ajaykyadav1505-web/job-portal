const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await pool.query(
      "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING user_id,name,role",
      [name, email, hashed, role]
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(400).json({ msg: "Email already exists" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const data = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  if (!data.rows.length)
    return res.status(400).json({ msg: "Invalid credentials" });

  const valid = await bcrypt.compare(password, data.rows[0].password);
  if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    {
      user_id: data.rows[0].user_id,
      role: data.rows[0].role,
    },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      user_id: data.rows[0].user_id,
      name: data.rows[0].name,
      role: data.rows[0].role,
    },
  });
};
