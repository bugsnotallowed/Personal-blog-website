import React from 'react'
import '../pages/BlogLandingPage.css'

const navbar = () => {
  return (
    <div>
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
    </div>
  )
}

export default navbar
