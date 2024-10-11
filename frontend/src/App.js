import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function HomePage() {
  return <h2>Home Page</h2>;
}

function MenuPage() {
  return <h2>Menu Page</h2>;
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/menu" component={MenuPage} />
      </Switch>
    </Router>
  );
}

export default App;
