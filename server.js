const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adarsh#MySQL1223", // Your MySQL password
  database: "blogdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Get Blogs by Category
app.get("/blogs", (req, res) => {
  const category = req.query.category;
  let sql = "SELECT * FROM blogs";
  if (category) {
    sql += ` WHERE category = ${mysql.escape(category)}`;
  }

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/blogs", async (req, res) => {
  const { id } = req.query;
  let sql = id ? `SELECT * FROM blogs WHERE id = ?` : `SELECT * FROM blogs`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (id) {
      res.json(results[0]); // ✅ Return a single blog object
    } else {
      res.json(results); // ✅ Return all blogs if no id is provided
    }
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
