import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ArticleList from './components/ArticleList';
import Article from './components/Article';

import './App.css';

function App() {
  return (
    <Router>
        <Route exact path="/" component={ArticleList} />
        <Route exact path="/:keyword" component={ArticleList} />
        <Route exact path="/article/:id" component={Article} />
    </Router>
  );
}

export default App;
