const express = require("express");
const Blog = require("../models/blog");
const upload = require("../cloudinaryStorage"); // your existing Cloudinary upload config

const router = express.Router();

// Create Blog
router.post(
  "/",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "authorAvatar", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, category, subCategory, description, authorName } = req.body;

      const coverPath = req.files?.cover?.[0]?.path || null;
      const authorAvatarPath =
        req.files?.authorAvatar?.[0]?.path ||
        "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749235947/blog-images/fanq3y09mdqtdh2yjnsh.png";

      let parsedSubCategory;
      try {
        parsedSubCategory =
          typeof subCategory === "string"
            ? JSON.parse(subCategory)
            : subCategory;
      } catch (e) {
        parsedSubCategory = Array.isArray(subCategory)
          ? subCategory
          : [subCategory];
      }

      const blog = new Blog({
        title,
        category,
        subCategory: parsedSubCategory,
        description,
        authorName,
        authorAvatar: authorAvatarPath,
        cover: coverPath,
      });

      await blog.save();
      res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ error: "Failed to create blog" });
    }
  }
);

// Get all blogs with filters
router.get("/", async (req, res) => {
  try {
    const { category, subCategory, search } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = { $in: [subCategory] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { authorName: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// Get unique categories
router.get("/categories/list", async (req, res) => {
  try {
    const categories = await Blog.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Get unique subcategories
router.get("/subcategories/list", async (req, res) => {
  try {
    const subcategories = await Blog.distinct("subCategory");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});

// Delete Blog
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;
