import React, { useState } from 'react'
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2, BookOpen } from 'lucide-react';
import '../pages/BlogDetail.css';

const BlogDetails = ({ blog, onBack }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    // <div className="blog-details">

    //   <header>
    //     <div className="details-container">
    //       <div className="details-nav">
    //         <button onClick={onBack} className="back-btn">
    //           <ArrowRight className="back-icon" />
    //           Back to Blog
    //         </button>
    //       </div>
    //     </div>
    //   </header>

    //   <article className="article">
    //     <div className="details-container">

    //       <div className="article-header">
    //         <div className="article-meta">
    //           <span className="article-category">{blog.category}</span>
    //           <div className="article-subcategories">
    //             {blog.subCategory.map(sub => (
    //               <span key={sub} className="subcategory-tag">{sub}</span>
    //             ))}
    //           </div>
    //         </div>

    //         <h1 className="article-title">{blog.title}</h1>

    //         <div className="article-author-section">
    //           <div className="article-author">
    //             <div className="article-author-avatar">
    //               {blog.authorName.charAt(0)}
    //             </div>
    //             <div className="article-author-info">
    //               <p className="article-author-name">{blog.authorName}</p>
    //               <div className="article-date">
    //                 <Calendar className="icon" />
    //                 {blog.createdAt}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>


    //       <div className="article-image">
    //         <div className="article-image-placeholder">
    //           <img loading="lazy" src={blog.cover} alt={blog.title} className="article-cover" />
    //         </div>
    //       </div>


    //       <div className="article-content">

    //         <div className="content-section">
    //           <p className="content-paragraph">{blog.description}</p>
    //         </div>
    //       </div>


    //       <div className="share-section">
    //         <h3 className="share-title">Share this article</h3>
    //         <div className="share-buttons">
    //           <button className="share-btn twitter">Twitter</button>
    //           <button className="share-btn linkedin">LinkedIn</button>
    //           <button className="share-btn whatsapp">WhatsApp</button>
    //         </div>
    //       </div>
    //     </div>
    //   </article>
    // </div>


    <div className="blog-detail">
      <section className="blog-hero">
        <div className="container">
          <button onClick={onBack} className="back-btn">
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </button>

          <div className="hero-content" style={{ backgroundImage: `url(${blog.cover})` }}>
            <div className="article-image">
              <div className='title-card'>

              <h1 className="blog-title">{blog.title}</h1>
              {/* <p className="blog-subtitle">{blog.subtitle}</p> */}

              <div className="author-info">
                <div className="author-avatar">
                  <img src={blog.authorAvatar} alt="Adarsh Gupta" />
                </div>
                <div className="author-details">
                  <h3 className="author-name">{blog.author}</h3>
                  <div className="post-meta">
                    <span className="publish-date">
                      <Calendar size={16} />
                      {blog.publishDate}
                    </span>
                    <span className="view-count">
                      <Eye size={16} />
                      {blog.views} views
                    </span>
                  </div>
                </div>
              </div>
              </div>


            </div>
          </div>
        </div>
      </section>


      <div className="blog-main">

        <div className="content-wrapper">
          <article className="blog-content">
            <div className="content-section">
              <p className="content-paragraph">{blog.description}</p>
            </div>
          </article>

          <aside className="blog-sidebar">
            <div className="sidebar-card">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button
                  className={`action-btn ${isLiked ? 'liked' : ''}`}
                  onClick={handleLike}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{blog.likes + (isLiked ? 1 : 0) || 28} </span>
                </button>
                <button className="action-btn">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Tags</h3>
              <div className="tags">
                {blog.subCategory.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h3>About the Author</h3>
              <div className="author-bio">
                <p>Full Stack Web Developer passionate about creating seamless digital experiences. Specialized in React, Next.js, and modern web technologies.</p>
                <a href="#" className="author-link">View Profile</a>
              </div>
            </div>
            <div className="share-section">
              <h3 className="share-title">Share this article</h3>
              <div className="share-buttons">
                <button className="share-btn twitter">Twitter</button>
                <button className="share-btn linkedin">LinkedIn</button>
                <button className="share-btn whatsapp">WhatsApp</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;