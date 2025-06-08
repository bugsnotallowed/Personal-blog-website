import React, { useState, useMemo } from 'react';
import { Search, Calendar, User, ArrowRight, Filter, X } from 'lucide-react';
import './BlogLandingPage.css';

// Sample data - replace this with your actual data.js import
const blogList = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    category: "Development",
    subCategory: ["NextJs", "ui/ux", "design"],
    description: "Excited to share my latest project - a personal portfolio website built with Next.js! 🚀 This site showcases my work, skills, and experiences in a sleek and modern design. It features responsive layouts, smooth animations, and a user-friendly interface. Check it out - adarsh-portfolio-website.vercel.app and let me know what you think! Your feedback is always appreciated. 😊 #NextJS #Portfolio #WebDevelopment #UIUXDesign",
    authorName: "Adarsh Gupta",
    authorAvatar: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749235947/blog-images/fanq3y09mdqtdh2yjnsh.png",
    createdAt: "June 03, 2025",
    cover: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749235943/blog-images/dbigixn9lzmudool7gvw.png",
  },
  {
    id: 2,
    title: "Our Startup Journey: Pre-Incubation at MU Ideas Foundation 🚀",
    category: "development",
    subCategory: ["frontend", "react", "javascript"],
    description: "Thrilled to Share Our Startup Journey 🚀My team and I had the incredible opportunity to present our startup idea, 📈Secure & Transparent Carbon Footprint Tracking Using Blockchain, at the MU Ideas Incubation Center, University of Mumbai, Kalina. We pitched our vision to Dr. Sachin S. Laddha, Business Coach, who appreciated our idea and offered us a pre-incubation opportunity—a major milestone for us!✨😁With this, we are excited to officially begin our journey under the pre-incubation agreement at MU Ideas Foundation 💡. This experience has been an eye-opener, giving us firsthand exposure to the startup ecosystem, business validation, and the structured process of establishing a venture.",
    authorName: "Adarsh Gupta",
    authorAvatar: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749235947/blog-images/fanq3y09mdqtdh2yjnsh.png",
    createdAt: "26 May 2025",
    cover: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749401934/DashboardSS_ikr6ra.png",
  },
  {
    id: 3,
    title: "Prakalp 3.0 (2K25) - National-Level Project Competition Organized Successfully!",
    category: "Experience",
    subCategory: ["Teamwork", "Competition", "Leadership"],
    description: "Thrilled to share that I successfully organized a National-Level Project Competition — Prakalp 3.0 (2K25) at my college, managing over 600+ teams from across India.As the Vice Chairperson of the IEEE and WIE Technical Council, this two-month journey was an eye-opening experience that taught me invaluable lessons in, Large-scale event planning and execution, Collaborating with 30+ council members, Sponsorship outreach and negotiation, Handling formal documentation and compliance, Navigating internal dynamics and balancing academics, One of our major achievements was securing a sponsorship amount of ₹1 Lakh, which enabled us to execute the event flow seamlessly.This experience pushed me well beyond my comfort zone and helped me understand the real importance of time management, task delegation, and team coordination.Grateful for this opportunity and excited to take these learnings forward in my future endeavors!",
    authorName: "Adarsh Gupta",
    authorAvatar: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749235947/blog-images/fanq3y09mdqtdh2yjnsh.png",
    createdAt: "April 22, 2025",
    cover: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749401982/Prakalp25Ieeephoto_f8raaw.jpg",
  },
  {
    id: 4,
    title: "Stockoholic - A Stock Screener Tool",
    category: "development",
    subCategory: ["Project", "Stocks", "Java"],
    description: "Introducing Stockoholic - A Stock Screener Tool! 📈💻\n\nI am thrilled to share my latest project, Stockoholic, a comprehensive stock Screener tool designed to help investors make informed decisions. This tool provides real-time stock data, technical analysis, and portfolio management features, all in one place.\n\nKey Features:\n- Real-time stock quotes and historical data\n- Technical indicators and charting tools\n- Portfolio tracking and performance analysis\n- User-friendly interface with responsive design\n\nBuilt with Java and JavaFX, Stockoholic aims to simplify stock Screener for both novice and experienced investors. Check it out and let me know your thoughts! #StockMarket #Java #PortfolioManagement #TechTools",
    authorName: "Adarsh Gupta",
    authorAvatar: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749235947/blog-images/fanq3y09mdqtdh2yjnsh.png",
    createdAt: "March 10, 2025",
    cover: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749402410/StockSearchSS_zxj5hc.png",
  },
  {
    id: 5,
    title: "Perparation of Placements",
    category: "Placement",
    subCategory: ["DSA", "Job", "College"],
    description: "As I prepare for placements, I wanted to share some insights and resources that have been incredibly helpful in my journey so far. 🚀\n\n1️⃣ **Understanding the Basics**: I started with the fundamentals of data structures and algorithms in Java. Websites like LeetCode, HackerRank, and GeeksforGeeks have been invaluable for practicing coding problems.\n\n2️⃣ **System Design**: For system design interviews, I recommend studying concepts like scalability, load balancing, and database design. Books like 'Designing Data-Intensive Applications' and online courses on Coursera or Udemy can provide a solid foundation.\n\n3️⃣ **Mock Interviews**: Participating in mock interviews has been a game-changer. Platforms like Pramp and Interviewing.io offer free mock interviews with peers and industry professionals.\n\n4️⃣ **Networking**: Connecting with alumni and professionals in the industry has opened doors to valuable insights and opportunities. LinkedIn is a great platform for this.\n\n5️⃣ **Soft Skills**: Don’t underestimate the power of soft skills! Communication, teamwork, and problem-solving abilities are crucial during interviews.\n\n6️⃣ **Stay Updated**: Keeping up with the latest trends in technology is essential. Follow tech blogs, podcasts, and YouTube channels to stay informed.\n\nRemember, preparation is key! Stay consistent, practice regularly, and don’t hesitate to seek help from mentors or peers. Good luck to everyone preparing for placements! 💪 #Placements #CareerPreparation #TechInterviews",
    authorName: "Adarsh Gupta",
    authorAvatar: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749235947/blog-images/fanq3y09mdqtdh2yjnsh.png",
    createdAt: "February 28, 2025",
    cover: "https://res.cloudinary.com/dkjvesqtz/image/upload/v1749233364/samples/cup-on-a-table.jpg",
  }
];

const BlogLandingPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(blogList.map(blog => blog.category))];
    return cats;
  }, []);

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogList.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.authorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const heroBlog = blogList[0];
  const otherBlogs = filteredBlogs.slice(1);

  if (selectedBlog) {
    return <BlogDetails blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

  return (
    <div className="blog-landing">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">Adarsh Writes Blogs</h1>
            <nav className="nav">
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/contact" className="nav-link">Contact</a>
            </nav>
          </div>
        </div>
      </header>

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
                    <img loading="lazy" src={heroBlog.authorAvatar} ></img>
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

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <h3 className="footer-title">Adarsh Writes Blogs</h3>
            <p className="footer-description">Stay updated with the latest in technology and design.</p>
            <p className="footer-copyright">&copy; 2024 Adarsh Writes Blogs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const BlogCard = ({ blog, onClick }) => {
  return (
    <div className="blog-card" onClick={onClick}>
      <div className="blog-card-image">
        <div className="blog-card-overlay">
          <img loading="lazy" src={blog.cover} alt={blog.title} className="blog-cover" />
        </div>
        <div className="blog-card-category">
          <span>{blog.category}</span>
        </div>
      </div>

      <div className="blog-card-content">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-description">{blog.description}</p>

        <div className="blog-card-footer">
          <div className="blog-card-author">
            <div className="blog-card-avatar">
              <img loading="lazy" src={blog.authorAvatar} ></img>
            </div>
            <div className="blog-card-author-info">
              <p className="blog-card-author-name">{blog.authorName}</p>
              <p className="blog-card-date">{blog.createdAt}</p>
            </div>
          </div>
          <ArrowRight className="blog-card-arrow" />
        </div>
      </div>
    </div>
  );
};

const BlogDetails = ({ blog, onBack }) => {
  return (
    <div className="blog-details">
      {/* Header */}
      <header className="details-header">
        <div className="details-container">
          <div className="details-nav">
            <button onClick={onBack} className="back-btn">
              <ArrowRight className="back-icon" />
              Back to Blog
            </button>
            <h1 className="details-logo">Adarsh Writes Blogs</h1>
          </div>
        </div>
      </header>

      <article className="article">
        <div className="details-container">
          {/* Article Header */}
          <div className="article-header">
            <div className="article-meta">
              <span className="article-category">{blog.category}</span>
              <div className="article-subcategories">
                {blog.subCategory.map(sub => (
                  <span key={sub} className="subcategory-tag">{sub}</span>
                ))}
              </div>
            </div>

            <h1 className="article-title">{blog.title}</h1>

            <div className="article-author-section">
              <div className="article-author">
                <div className="article-author-avatar">
                  {blog.authorName.charAt(0)}
                </div>
                <div className="article-author-info">
                  <p className="article-author-name">{blog.authorName}</p>
                  <div className="article-date">
                    <Calendar className="icon" />
                    {blog.createdAt}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="article-image">
            <div className="article-image-placeholder">
              <img loading="lazy" src={blog.cover} alt={blog.title} className="article-cover" />
            </div>
          </div>

          {/* Article Content */}
          <div className="article-content">
            {/* <p className="article-intro">{blog.description}</p> */}

            <div className="content-section">
              <p className="content-paragraph">{blog.description}</p>
              {/* <p className="content-paragraph">
                This is where your full article content would go. You can expand this section to include the complete blog post content, images, code snippets, and any other media.
              </p>
              <p className="content-paragraph">
                The blog details page is fully functional and ready to display your complete articles. You can customize the layout and styling to match your brand and content needs.
              </p>
              <p className="content-paragraph">
                Remember to replace the sample data with your actual blog content from your data.js file.
              </p> */}
            </div>
          </div>

          {/* Share Section */}
          <div className="share-section">
            <h3 className="share-title">Share this article</h3>
            <div className="share-buttons">
              <button className="share-btn twitter">Twitter</button>
              <button className="share-btn linkedin">LinkedIn</button>
              <button className="share-btn whatsapp">WhatsApp</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogLandingPage;