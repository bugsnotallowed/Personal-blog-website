import React, { useState, useEffect } from 'react';
import './BlogLanding.css';
import { Link } from 'react-router-dom';

const BlogLanding = () => {
  const [blogs, setBlogs] = useState([]);
  //const [id, setId] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  //const [showBlogForm, setShowBlogForm] = useState(false);

  // Blog form state
  // const [formData, setFormData] = useState({
  //   title: '',
  //   category: '',
  //   subCategory: '',
  //   description: '',
  //   authorName: '',
  //   cover: null,
  //   authorAvatar: null
  // });

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchBlogs = async (filters = {}) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams();

      if (filters.category) queryParams.append('category', filters.category);
      if (filters.subCategory) queryParams.append('subCategory', filters.subCategory);
      if (filters.search) queryParams.append('search', filters.search);

      const response = await fetch(`${API_BASE_URL}/blogs?${queryParams}`);
      const data = await response.json();

      setBlogs(data);
      if (data.length > 0) {
        setFeaturedBlog(data[0]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };



  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subcategories`);
      const data = await response.json();
      setSubCategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleSearch = () => {
    fetchBlogs({
      search: searchTerm,
      category: selectedCategory,
      subCategory: selectedSubCategory
    });
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    fetchBlogs({
      category: category,
      subCategory: selectedSubCategory,
      search: searchTerm
    });
  };

  const handleSubCategoryFilter = (subCategory) => {
    setSelectedSubCategory(subCategory);
    fetchBlogs({
      category: selectedCategory,
      subCategory: subCategory,
      search: searchTerm
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    fetchBlogs();
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  return (
    <div className="blog-landing">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>📚 Adarsh Writes</h1>
            </div>
            <nav className="nav">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </nav>
            {/* <div className="header-actions">
              <button className="btn-secondary" onClick={() => setShowBlogForm(true)}>
                Write Blog
              </button>
            </div> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {featuredBlog && (
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-image">
                <img
                  src={featuredBlog.cover || '/api/placeholder/600/400'}
                  alt={featuredBlog.title}
                  onError={(e) => {
                    e.target.src = '/api/placeholder/600/400';
                  }}
                />
                <div className="hero-stats">
                  <div className="stat">
                    <span className="stat-number">4,862</span>
                    <span className="stat-label">Total Blogs</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">290</span>
                    <span className="stat-label">This Month</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">1,521</span>
                    <span className="stat-label">Total Views</span>
                  </div>
                </div>
              </div>
              <div className="hero-text">
                <span className="hero-badge">Featured • 6 mins read</span>
                <h1 className="hero-title">{featuredBlog.title}</h1>
                <p className="hero-description">
                  {truncateText(featuredBlog.description, 200)}
                </p>
                {blogs.map((blog) => (
                  <article key={blog.id}>
                    {/* ... your content ... */}
                    <Link to={`/blog/${blog.id}`} className="btn-link">
                      Read More →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-content">
            <div className="search-form">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedSubCategory}
                onChange={(e) => handleSubCategoryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">All Subcategories</option>
                {subCategories.map(subCategory => (
                  <option key={subCategory} value={subCategory}>{subCategory}</option>
                ))}
              </select>
              <button onClick={handleSearch} className="btn-primary">Search</button>
              <button onClick={clearFilters} className="btn-secondary">Clear</button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="articles-section">
        <div className="container">
          <div className="section-header">
            <h2>My Recent Articles</h2>
            <p>Stay informed with my latest work and thoughts</p>
          </div>

          {isLoading ? (
            <div className="loading">Loading blogs...</div>
          ) : (
            <div className="articles-grid">
              {blogs.slice(1).map(blog => (
                <article key={blog.id} className="article-card">
                  <div className="article-image">
                    <img
                      src={blog.cover || '/api/placeholder/350/200'}
                      alt={blog.title}
                      onError={(e) => {
                        e.target.src = '/api/placeholder/350/200';
                      }}
                    />
                    <div className="article-category">{blog.category}</div>
                  </div>
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="article-date">{blog.createdAt}</span>
                      <div className="article-tags">
                        {blog.subCategory.slice(0, 2).map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <h3 className="article-title">{blog.title}</h3>
                    <p className="article-description">
                      {truncateText(blog.description, 120)}
                    </p>
                    <div className="article-author">
                      <img
                        src={blog.authorAvatar || 'https://res.cloudinary.com/dkjvesqtz/image/upload/v1749235947/blog-images/fanq3y09mdqtdh2yjnsh.png'}
                        alt={blog.authorName}
                        className="author-avatar"
                        onError={(e) => {
                          e.target.src = 'https://res.cloudinary.com/dkjvesqtz/image/upload/v1749235947/blog-images/fanq3y09mdqtdh2yjnsh.png';
                        }}
                      />
                      <span className="author-name">{blog.authorName}</span>
                    </div>
                    <button className="btn-link">Read More →</button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {blogs.length === 0 && !isLoading && (
            <div className="no-blogs">
              <p>No blogs found. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Form Modal */}
      {/* {showBlogForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create New Blog</h2>
              <button
                className="modal-close"
                onClick={() => setShowBlogForm(false)}
              >
                ×
              </button>
            </div>
            <div className="blog-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subcategories (comma separated)</label>
                <input
                  type="text"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  placeholder="e.g., skill, ethics, corporate"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  required
                />
              </div>
              <div className="form-group">
                <label>Author Name</label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cover Image</label>
                <input
                  type="file"
                  name="cover"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <div className="form-group">
                <label>Author Avatar</label>
                <input
                  type="file"
                  name="authorAvatar"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <div className="form-actions">
                <button onClick={() => setShowBlogForm(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleFormSubmit} className="btn-primary">
                  Create Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default BlogLanding;