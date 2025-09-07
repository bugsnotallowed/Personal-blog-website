import React, { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, ArrowRight, Filter } from 'lucide-react';
import './BlogLandingPage.css';
import BlogCard from "../components/BlogCard";
import BlogDetails from '../components/BlogDetails';


const BlogLandingPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then(res => res.json())
      .then(data => setBlogList(data))
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);
  

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(blogList.map(blog => blog.category))];
    return cats;
  }, [blogList]);

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogList.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.authorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, blogList]);

  if (blogList.length === 0) {
    return <p>Loading blogs...</p>; // show loading message until data comes
  }

  const BlogListLength = blogList.length;
  const heroBlog = blogList[BlogListLength - 1]; //last blog will be the hero blog
  const otherBlogs = filteredBlogs.slice(0,BlogListLength - 1); //leaving the hero blog

  if (selectedBlog) {
    return <BlogDetails blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

  return (
    <div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-card">
            <div className="hero-image">
              <div className="hero-image-overlay">
                <img loading="lazy" src={heroBlog.cover} alt={heroBlog.title} className="hero-cover" />
              </div>
              <div className="featured-badge">
                <span>Featured</span>
              </div>
            </div>
            <div className="hero-content">
              <div className="hero-meta">
                <span className="category-badge">{heroBlog.category}</span>
                <div className="date-info">
                  <Calendar className="icon" />
                  {heroBlog.createdAt}
                </div>
              </div>
              <h2 className="hero-title">{heroBlog.title}</h2>
              <p className="hero-description">{heroBlog.description}</p>
              <div className="hero-footer">
                <div className="author-info">
                  <div className="author-avatar">
                    <img loading="lazy" src={heroBlog.authorAvatar} alt={heroBlog.title} ></img>
                  </div>
                  <div className="author-details">
                    <p className="author-name">{heroBlog.authorName}</p>
                    <p className="author-role">Author</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBlog(heroBlog)}
                  className="read-more-btn"
                >
                  Read More
                  <ArrowRight className="icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-section">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="filter-toggle"
              >
                <Filter className="icon" />
                Filters
              </button>

              <div className={`category-filters ${showFilters ? 'show' : ''}`}>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            <p className="articles-count">{otherBlogs.length} articles found</p>
          </div>

          <div className="blog-grid">
            {otherBlogs.map(blog => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onClick={() => setSelectedBlog(blog)}
              />
            ))}
          </div>

          {otherBlogs.length === 0 && (
            <div className="no-results">
              <p>No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
      </div>
  );
};

export default BlogLandingPage;