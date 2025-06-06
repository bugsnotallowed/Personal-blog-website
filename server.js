const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { env } = require("process");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});


// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: DB_USER,
  password: 'Adarsh#MySQL1223',
  database: DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Create blogs table if it doesn't exist
const createBlogsTable = `
  CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subCategory JSON,
    description TEXT NOT NULL,
    authorName VARCHAR(100) NOT NULL,
    authorAvatar VARCHAR(255),
    cover VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

db.query(createBlogsTable, (err) => {
  if (err) {
    console.error("Error creating blogs table:", err);
  } else {
    console.log("Blogs table ready");
  }
});

function parseSubCategory(value) {
  if (!value) return [];

  // If already an array, return it
  if (Array.isArray(value)) return value;

  // Try to parse as JSON
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    // Fallback: treat as comma-separated string
    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean); // removes empty strings
    }
    return [];
  }
}


// Routes

const upload = require("./cloudinaryStorage"); // use Cloudinary storage

app.post(
  "/api/blogs",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "authorAvatar", maxCount: 1 },
  ]),
  (req, res) => {
    const { title, category, subCategory, description, authorName } = req.body;

    const coverPath = req.files?.cover?.[0]?.path || null;
    const authorAvatarPath = req.files?.authorAvatar?.[0]?.path || null;

    let parsedSubCategory;
    try {
      parsedSubCategory =
        typeof subCategory === "string" ? JSON.parse(subCategory) : subCategory;
    } catch (e) {
      parsedSubCategory = Array.isArray(subCategory)
        ? subCategory
        : [subCategory];
    }

    const query = `
      INSERT INTO blogs (title, category, subCategory, description, authorName, authorAvatar, cover)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        title,
        category,
        JSON.stringify(parsedSubCategory),
        description,
        authorName,
        authorAvatarPath,
        coverPath,
      ],
      (err, result) => {
        if (err) {
          console.error("Error creating blog:", err);
          res.status(500).json({ error: "Failed to create blog" });
          return;
        }

        res.status(201).json({
          message: "Blog created successfully",
          blogId: result.insertId,
        });
      }
    );
  }
);

// Get all blogs with optional search
app.get("/api/blogs", (req, res) => {
  const { category, subCategory, search } = req.query;

  let query = "SELECT * FROM blogs";
  let queryParams = [];
  let conditions = [];

  if (category) {
    conditions.push("category = ?");
    queryParams.push(category);
  }

  if (subCategory) {
    conditions.push("JSON_CONTAINS(subCategory, ?)");
    queryParams.push(`"${subCategory}"`);
  }

  if (search) {
    conditions.push(
      "(title LIKE ? OR description LIKE ? OR authorName LIKE ?)"
    );
    queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY createdAt DESC";

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching blogs:", err);
      res.status(500).json({ error: "Failed to fetch blogs" });
      return;
    }

    // Parse subCategory JSON for each blog
    const blogs = results.map((blog) => ({
      ...blog,
      subCategory: parseSubCategory(blog.subCategory),
      createdAt: new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

    res.json(blogs);
  });
});

// Get single blog by ID
app.get("/api/blogs/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM blogs WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching blog:", err);
      res.status(500).json({ error: "Failed to fetch blog" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    const blog = {
      ...results[0],
      subCategory: JSON.parse(results[0].subCategory || "[]"),
      createdAt: new Date(results[0].createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    res.json(blog);
  });
});

// Create new blog
// app.post(
//   "/api/blogs",
//   upload.fields([
//     { name: "cover", maxCount: 1 },
//     { name: "authorAvatar", maxCount: 1 },
//   ]),
//   (req, res) => {
//     const { title, category, subCategory, description, authorName } = req.body;

//     // Handle file uploads
//     const coverPath = req.files?.cover
//       ? `/uploads/${req.files.cover[0].filename}`
//       : null;
//     const authorAvatarPath = req.files?.authorAvatar
//       ? `/uploads/${req.files.authorAvatar[0].filename}`
//       : null;

//     // Parse subCategory if it's a string
//     let parsedSubCategory;
//     try {
//       parsedSubCategory =
//         typeof subCategory === "string" ? JSON.parse(subCategory) : subCategory;
//     } catch (e) {
//       parsedSubCategory = Array.isArray(subCategory)
//         ? subCategory
//         : [subCategory];
//     }

//     const query = `
//     INSERT INTO blogs (title, category, subCategory, description, authorName, authorAvatar, cover)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;

//     db.query(
//       query,
//       [
//         title,
//         category,
//         JSON.stringify(parsedSubCategory),
//         description,
//         authorName,
//         authorAvatarPath,
//         coverPath,
//       ],
//       (err, result) => {
//         if (err) {
//           console.error("Error creating blog:", err);
//           res.status(500).json({ error: "Failed to create blog" });
//           return;
//         }

//         res.status(201).json({
//           message: "Blog created successfully",
//           blogId: result.insertId,
//         });
//       }
//     );
//   }
// );

// Get unique categories
app.get("/api/categories", (req, res) => {
  db.query("SELECT DISTINCT category FROM blogs", (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      res.status(500).json({ error: "Failed to fetch categories" });
      return;
    }

    const categories = results.map((row) => row.category);
    res.json(categories);
  });
});


// Get unique subcategories
// app.get("/api/subcategories", (req, res) => {
//   db.query("SELECT subCategory FROM blogs", (err, results) => {
//     if (err) {
//       console.error("Error fetching subcategories:", err);
//       res.status(500).json({ error: "Failed to fetch subcategories" });
//       return;
//     }

//     const allSubCategories = new Set();
//     results.forEach((row) => {
//       const subCats = JSON.parse(row.subCategory || "[]");
//       subCats.forEach((subCat) => allSubCategories.add(subCat));
//     });

//     res.json(Array.from(allSubCategories));
//   });
// });

app.get("/api/subcategories", (req, res) => {
  db.query("SELECT subCategory FROM blogs", (err, results) => {
    if (err) {
      console.error("Error fetching subcategories:", err);
      res.status(500).json({ error: "Failed to fetch subcategories" });
      return;
    }

    const allSubCategories = new Set();

    results.forEach((row) => {
      const subCats = parseSubCategory(row.subCategory);
      subCats.forEach((subCat) => allSubCategories.add(subCat));
    });

    res.json(Array.from(allSubCategories));
  });
});


// Delete blog
app.delete("/api/blogs/:id", (req, res) => {
  const { id } = req.params;

  // First get the blog to delete associated files
  db.query(
    "SELECT cover, authorAvatar FROM blogs WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error fetching blog for deletion:", err);
        res.status(500).json({ error: "Failed to delete blog" });
        return;
      }

      if (results.length > 0) {
        const blog = results[0];

        // Delete associated files
        if (blog.cover && fs.existsSync("." + blog.cover)) {
          fs.unlinkSync("." + blog.cover);
        }
        if (blog.authorAvatar && fs.existsSync("." + blog.authorAvatar)) {
          fs.unlinkSync("." + blog.authorAvatar);
        }
      }

      // Delete the blog from database
      db.query("DELETE FROM blogs WHERE id = ?", [id], (err, result) => {
        if (err) {
          console.error("Error deleting blog:", err);
          res.status(500).json({ error: "Failed to delete blog" });
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Blog not found" });
          return;
        }

        res.json({ message: "Blog deleted successfully" });
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
