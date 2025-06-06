import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Contact from './pages/Contact';
import BlogLanding from './pages/BlogLanding';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <div className='container'>
      <Switch>
        <Route path='/' exact component={BlogLanding} />
        {/* <Route path='/blogs/:id' component={Blog} /> */}
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={AboutPage} />
        {/* <Route path='/create' component={CreateBlog} /> */}
      </Switch>
    </div>
  );
};

export default App;