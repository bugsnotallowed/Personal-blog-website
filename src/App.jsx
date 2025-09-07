import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Contact from './pages/Contact';
import BlogLanding2 from './pages/BlogLanding2';
import AboutPage from './pages/AboutPage';
import CreateBlog from './pages/CreateBlog';
import Navbar from './components/navbar';
import Footer from './components/footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        {/* <Route path="/" exact component={BlogLanding} /> */}
        <Route path="/" exact component={BlogLanding2} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={Contact} />
        <Route path="/createblog" component={CreateBlog} />
        {/* ...other routes */}
      </Switch>
      <Footer />
    </div>
  );
};

export default App;