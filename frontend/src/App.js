import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Products from './components/product/Products';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/products' exact component={Products} />
      </Switch>
    </Router>
  );
}

export default App;
