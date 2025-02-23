import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { blogList } from '../../config/data';
import Chip from '../../components/common/Chip';
import EmptyList from '../../components/common/EmptyList';
import './styles.css';
import { Link } from 'react-router-dom';
import Contact from '../Contact';

const Blog = () => {
  const { id } = useParams(); //Get blog Id from URL
  console.log(id);
  const [blog, setBlog] = useState(null);

  // useEffect(() => {
  //   let blog = blogList.find((blog) => blog.id === parseInt(id));
  //   if (blog) {
  //     setBlog(blog);
  //   }
  // }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs?id=${id}`) // Fetch blog by ID
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Blog:", data[id - 1]);
        setBlog(data[id - 1]);
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <>
      <Link className='blog-goBack' to='/'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {blog ? (
        <div className='blog-wrap'>
          <header>
            <p className='blog-date'>Published {blog.created_at}</p>
            <h1>{blog.title}</h1>
            <div className='blog-subCategory'>
              {/* Convert subCategory to array and map */}
              {blog?.subCategory?.split(",").map((category, i) => (
                <div key={i}>
                  <Chip label={category.trim()} />
                </div>
              ))}
            </div>
          </header>
          <img src={blog.cover} alt='cover' />
          <div className='blogItem-author'>
            <img src={blog.authorAvatar} alt='avatar' />
            <div>
              <h6>{blog.authorName}</h6>
              <p>{blog.created_at}</p>
            </div>
          </div>
          <p className='blog-desc'>{blog.content}</p>
        </div>
      ) : (
        <EmptyList />
      )}

      <Contact />
    </>
  );
};

export default Blog;