import React, { useState } from 'react';
import './BlogLanding.css';
//import { useNavigate  } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api';

const CreateBlog = () => {
  const [showBlogForm, setShowBlogForm] = useState(false);

  // Blog form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subCategory: '',
    description: '',
    authorName: '',
    cover: null,
    authorAvatar: null
  });

  const handleFormSubmit = async () => {
    //const navigate = useNavigate();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('subCategory', JSON.stringify(formData.subCategory.split(',').map(s => s.trim())));
    formDataToSend.append('description', formData.description);
    formDataToSend.append('authorName', formData.authorName);

    if (formData.cover) {
      formDataToSend.append('cover', formData.cover);
    }
    if (formData.authorAvatar) {
      formDataToSend.append('authorAvatar', formData.authorAvatar);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        alert('Blog created successfully!');
        setShowBlogForm(false);
        setFormData({
          title: '',
          category: '',
          subCategory: '',
          description: '',
          authorName: '',
          cover: null,
          authorAvatar: null
        });

        // navigate("/"); // Reload to see the new blog in the list
        //fetchBlogs();
      } else {
        alert('Error creating blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Error creating blog');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  return (
    <div>
      <div className="header-actions">
        <button className="btn-secondary" onClick={() => setShowBlogForm(true)}>
          Write Blog
        </button>
      </div>
      {showBlogForm && (
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
      )}
    </div>
  )
}

export default CreateBlog




