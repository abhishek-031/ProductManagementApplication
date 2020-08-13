import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Products from './components/product/Products';
import AddProduct from './components/product/AddProduct';
import EditProduct from './components/product/EditProduct';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/products' exact component={Products} />
        <Route path='/addproduct' exact component={AddProduct} />
        <Route path='/:id' exact component={EditProduct} />
      </Switch>
    </Router>
  );
}

export default App;
