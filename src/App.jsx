import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Contact from './pages/Contact';
// import BlogLanding from './pages/BlogLanding';
import BlogLanding2 from './pages/BlogLanding2';
import AboutPage from './pages/AboutPage';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';

const App = () => {
  return (
    <div className='container'>
      <Switch>
        {/* <Route path="/" exact component={BlogLanding} /> */}
        <Route path="/" exact component={BlogLanding2} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={Contact} />
        <Route path="/createblog" component={CreateBlog} />
        {/* ...other routes */}
      </Switch>
    </div>
  );
};

export default App;