import React from 'react';
import Login from './login';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-purple-500 shadow-lg"> 
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            {/* Logo */}
            <div>
              <Link to="#" className="flex items-center py-4 px-2">
                <img src="" alt="" className="h-8 w-8 mr-2" />
                <span className="font-semibold text-purple-100 text-lg">Adarsh Writes</span>
              </Link>
            </div>
            {/* Primary Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-4 px-2 text-white font-semibold hover:text-purple-300 transition duration-300">Home</Link>
              <Link to="/about" className="py-4 px-2 text-white font-semibold hover:text-purple-300 transition duration-300">About</Link>
              <Link to="/blog" className="py-4 px-2 text-white font-semibold hover:text-purple-300 transition duration-300">Blog</Link>
              <Link to="/contact" className="py-4 px-2 text-white font-semibold hover:text-purple-300 transition duration-300">Contact</Link>
            </div>
          </div>
          {/* Secondary Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <button href="#" className="py-2 px-2 font-medium text-black-500 bg-white rounded hover:bg-purple-300 transition duration-300">Login</button>
            <button href="#" className="py-2 px-4 font-medium text-black bg-white rounded hover:bg-purple-300 transition duration-300">Signup</button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg className="w-6 h-6 text-black-500 hover:text-blue-500" 
                   x-show="!showMenu" 
                   fill="none" 
                   strokeLinecap="round" 
                   strokeLinejoin="round" 
                   strokeWidth="2" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="hidden mobile-menu">
        <ul className="">
          <li><a href="#" className="block text-sm px-2 py-4 text-white bg-blue-500 font-semibold">Home</a></li>
          <li><a href="#" className="block text-sm px-2 py-4 hover:bg-black-200 transition duration-300">About</a></li>
          <li><a href="#" className="block text-sm px-2 py-4 hover:bg-black-200 transition duration-300">Blog</a></li>
          <li><a href="#" className="block text-sm px-2 py-4 hover:bg-black-200 transition duration-300">Contact</a></li>
          <li><a href="#" className="block text-sm px-2 py-4 hover:bg-black-200 transition duration-300">Login</a></li>
          <li><a href="#" className="block text-sm px-2 py-4 hover:bg-black-200 transition duration-300">Signup</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
