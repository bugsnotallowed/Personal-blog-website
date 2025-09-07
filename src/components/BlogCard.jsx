import React from 'react'
import { Search, Calendar, ArrowRight, Filter } from 'lucide-react';

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
              <img loading="lazy" src={blog.authorAvatar} alt={blog.title} ></img>
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

export default BlogCard
