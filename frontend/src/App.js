import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Products from './components/product/Products';
import AddProduct from './components/product/AddProduct';
import EditProduct from './components/product/EditProduct';
import Header from './components/Header/Header';
import { fetchProducts } from './store/actions/actionCreators';
import { connect } from 'react-redux';

class App extends React.Component {

  constructor(props){
    super(props);
    props.fetchProducts();
  }

  editProduct = props => (
    <EditProduct {...props} />
  )

  addProduct = props => (
    <AddProduct {...props} />
  )

  render(){
    const token = localStorage.getItem('auth-token');
    let loggedIn;
    if(token){
      loggedIn = true;
    }
    else{
      loggedIn=false;
    }
    console.log(loggedIn);
    return (
      <>
        <Header />
        <Router>
          {
            loggedIn?
            <Redirect exact from='' to='/products' />:
            null
          }
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login'>
              { loggedIn? <Redirect to='/products' />:<Login />}
            </Route>
            <Route exact path='/signup'>
              { loggedIn? <Redirect to='/products' />:<SignUp />}
            </Route>
            <Route path='/products' exact>
              { loggedIn? <Products />: <Redirect to='/login' />}
            </Route>
            <Route path='/addproduct' exact>
              { loggedIn ? this.addProduct : <Redirect to='/login' />}
            </Route>
            <Route path='/:id' exact>
              { loggedIn ? this.editProduct: <Redirect to='/login' />}
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts : () => dispatch(fetchProducts())
})

export default connect(null,mapDispatchToProps)(App);
