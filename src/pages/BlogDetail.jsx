import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2, BookOpen } from 'lucide-react';
//import './BlogDetail.css';

const API_BASE_URL = 'http://localhost:5000/api';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogById = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogById(id);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="blog-detail">
      <img src={blog.cover} alt={blog.title} />
      <h1>{blog.title}</h1>
      <p>By {blog.authorName}</p>
      <div>{blog.description}</div>
    </div>
    // <div className="blog-detail">
    //   {/* Header */}
    //   <header className="blog-header">
    //     <div className="container">
    //       <nav className="blog-nav">
    //         <div className="nav-left">
    //           <div className="logo">
    //             <BookOpen size={24} />
    //             <span>Adarsh Writes</span>
    //           </div>
    //         </div>
    //         <div className="nav-center">
    //           <a href="/" className="nav-link">Home</a>
    //           <a href="/about" className="nav-link">About</a>
    //           <a href="/contact" className="nav-link">Contact</a>
    //         </div>
    //         <div className="nav-right">
    //           <button className="write-btn">Write Blog</button>
    //         </div>
    //       </nav>
    //     </div>
    //   </header>

    //   {/* Hero Section */}
    //   <section className="blog-hero">
    //     <div className="container">
    //       <button className="back-btn">
    //         <ArrowLeft size={20} />
    //         <span>Back to Blog</span>
    //       </button>
          
    //       <div className="hero-content">
    //         <div className="blog-meta">
    //           {blog.featured && <span className="featured-badge">Featured</span>}
    //           <span className="read-time">
    //             <Clock size={16} />
    //             {blog.readTime}
    //           </span>
    //         </div>
            
    //         <h1 className="blog-title">{blog.title}</h1>
    //         <p className="blog-subtitle">{blog.subtitle}</p>
            
    //         <div className="author-info">
    //           <div className="author-avatar">
    //             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Adarsh Gupta" />
    //           </div>
    //           <div className="author-details">
    //             <h3 className="author-name">{blog.authorName}</h3>
    //             <div className="post-meta">
    //               <span className="publish-date">
    //                 <Calendar size={16} />
    //                 {blog.publishDate}
    //               </span>
    //               <span className="view-count">
    //                 <Eye size={16} />
    //                 {blog.views} views
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Main Content */}
    //   <main className="blog-main">
    //     <div className="container">
    //       <div className="content-wrapper">
    //         <article className="blog-content">
    //           <div dangerouslySetInnerHTML={{ __html: blog.description.replace(/\n\n## /g, '</p><h2>').replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }} />
    //         </article>
            
    //         <aside className="blog-sidebar">
    //           <div className="sidebar-card">
    //             <h3>Quick Actions</h3>
    //             <div className="action-buttons">
    //               <button 
    //                 className={`action-btn ${isLiked ? 'liked' : ''}`}
    //                 onClick={handleLike}
    //               >
    //                 <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
    //                 <span>{blog.likes + (isLiked ? 1 : 0)}</span>
    //               </button>
    //               <button className="action-btn">
    //                 <Share2 size={20} />
    //                 <span>Share</span>
    //               </button>
    //             </div>
    //           </div>
              
    //           <div className="sidebar-card">
    //             <h3>Tags</h3>
    //             <div className="tags">
    //               {blog.tags.map((tag, index) => (
    //                 <span key={index} className="tag">{tag}</span>
    //               ))}
    //             </div>
    //           </div>
              
    //           <div className="sidebar-card">
    //             <h3>About the Author</h3>
    //             <div className="author-bio">
    //               <p>Full Stack Web Developer passionate about creating seamless digital experiences. Specialized in React, Next.js, and modern web technologies.</p>
    //               <a href="" className="author-link">View Profile</a>
    //             </div>
    //           </div>
    //         </aside>
    //       </div>
    //     </div>
    //   </main>

    //   {/* Footer */}
    //   <footer className="blog-footer">
    //     <div className="container">
    //       <div className="footer-content">
    //         <div className="footer-left">
    //           <div className="logo">
    //             <BookOpen size={24} />
    //             <span>Adarsh Writes</span>
    //           </div>
    //           <p>Transforming concepts into seamless experiences</p>
    //         </div>
    //         <div className="footer-right">
    //           <p>&copy; 2024 Adarsh Gupta. All rights reserved.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default BlogDetail;
