import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const BlogItem = ({
  blog: {
    content,
    title,
    created_at,
    authorName,
    authorAvatar,
    cover,
    category,
    id,
  },
}) => {
  const handleReadMore = () => {
    window.location.href = `/blogs/${id}`;
  };

  return (
    <div className='blogItem-wrap'>
      <img className='blogItem-cover' src={cover} alt='cover' />
      <Chip label={category} />
      <h3>{title}</h3>
      <p className='blogItem-desc'>{content}</p>
      <footer>
        <div className='blogItem-author'>
          <img src={authorAvatar} alt='avatar' />
          <div>
            <h6>{authorName}</h6>
            <p>{created_at}</p>
          </div>
        </div>
        {/* <Link className='blogItem-link' to={`/blogs/category=${category}`}>
          Read ➝
        </Link> */}
        {/* <button className='blogItem-link' onClick={handleReadMore}>
          Read ➝
        </button> */}
        <Link to={`/blogs/${id}`}>Read More</Link>

      </footer>
    </div>
  );
};

export default BlogItem;