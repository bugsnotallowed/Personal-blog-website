import React from 'react';
import { useState, useEffect } from "react";
import BlogItem from './BlogItem';
import './styles.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/blogs?category=${category}`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error(err));
  }, [category]);

  return (
    <div>

      {/* <input
        type="text"
        placeholder="Search by category..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      /> */}

      <div className='blogList-wrap'>
        {blogs.map((blog) => (
          <BlogItem blog={blog} />
        ))}
      </div>
    </div>
  );
};

// const BlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [category, setCategory] = useState("");

//   useEffect(() => {
//     fetch(`http://localhost:5000/blogs?category=${category}`)
//       .then(res => res.json())
//       .then(data => setBlogs(data))
//       .catch(err => console.error(err));
//   }, [category]);

//   return (
//     <div>
//       <h1>Blog Posts</h1>
//       <input
//         type="text"
//         placeholder="Search by category..."
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       />
//       <ul>
//         {blogs.map(blog => (
//           <li key={blog.id}>
//             <img src={blog.coverImg} alt={blog.title} style={{ width: "200px", borderRadius: "10px" }} />
//             <h3>{blog.title}</h3>
//             <p>{blog.content}</p>
//             <strong>Category: {blog.category}</strong>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default BlogList;