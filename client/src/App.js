import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ArticleItem from './components/ArticleItem';
import Search from './components/Search';

import './App.css';

function App() {
  return (
    <Router>
        <Route exact path="/" component={Search} />
        <Route exact path="/:keyword" component={Search} />
        <Route exact path="/article/:id" component={ArticleItem} />
    </Router>
  );
}

export default App;
