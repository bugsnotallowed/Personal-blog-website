import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Footer = () => (
  <header className='home-footer'>
    <h3>Write a message.</h3>
    <button className="btn">
      <Link className='contact-form' to={`/contact`}>
        Send a email ➝
      </Link>
    </button>
  </header>
);

export default Footer;