import React, { useState, useEffect } from 'react';
import EmptyList from '../../components/common/EmptyList';
import BlogList from '../../components/Home/BlogList';
import Header from '../../components/Home/Header';
import SearchBar from '../../components/Home/SearchBar';
import { blogList } from '../../config/data';
import Footer from '../../components/Home/Footer';

const Home = () => {
  // const [blogs, setBlogs] = useState(blogList);
  const [category, setCategory] = useState('');

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs?category=${category}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch blog data');
        }
        return res.json();
      })
      .then(data => setBlogs(data))
      .catch(err => console.error(err));
  }, [category]);

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = blogList;
    const filteredBlogs = allBlogs.filter((blog) =>
      blog.category.toLowerCase().includes(category.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setBlogs(blogList);
    setCategory('');
  };

  return (
    <div>
      {/* Page Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar
        formSubmit={handleSearchBar}
        value={category}
        clearSearch={handleClearSearch}
        handlecategory={(e) => setCategory(e.target.value)}
      />

      {/* Blog List & Empty View */}
      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;