import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ArticleItem from './components/ArticleItem';
import Search from './components/Search';

const App: React.FC = () => {
  return (
    <Router>
        <Route exact path="/" component={Search} />
        <Route exact path="/:keyword" component={Search} />
        <Route exact path="/article/:id" component={ArticleItem} />
    </Router>
  );
}

export default App;


