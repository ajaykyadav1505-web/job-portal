const pool = require("./config/db");

pool.query("SELECT * FROM users", (err, res) => {
  if (err) {
    console.log("❌ Error", err);
  } else {
    console.log("✅ DB Connected");
  }
});
