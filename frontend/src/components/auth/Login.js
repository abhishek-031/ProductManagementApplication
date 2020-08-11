import React, { Component } from 'react';
import { loginUserAsync } from '../../store/reducers/authReducers';
import { connect } from 'react-redux';

class LoginComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      loading:false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    switch(name){
      case 'email':
        return this.setState({
          email:value
        });
      case 'password':
        return this.setState({
          password:value
        })
      default:
        return;
    }
  }

  async handleSubmit(e){
    this.setState({
      loading:true
    });
    e.preventDefault();
    await this.props.loginUser({
      email:this.state.email,
      password:this.state.password
    });
    this.setState({
      loading:false,
    });
    console.log(this.props.user);
  }

  render(){
    return (
      <>
        {
          this.state.loading?<h1>Loading...</h1>:
          <form onSubmit={e=>this.handleSubmit(e)}>
          <input name='email' placeholder='Email' onChange={this.handleChange} required value={this.state.email} type='email' />
          <input name='password' placeholder='Password' required onChange={this.handleChange} value={this.state.password} type='password' />
          <button type='submit'>Login</button>
        </form>
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user:state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser : user => dispatch(loginUserAsync(user))
  }
}

const Login = connect(mapStateToProps,mapDispatchToProps)(LoginComponent);

export default Login;