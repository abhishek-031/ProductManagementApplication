import React, { Component } from 'react';
import fetch from 'cross-fetch';

class SignUp extends Component{
  constructor(){
    super();
    this.state = {
      loading:false,
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      gender: 'Male',
      password: '',
      confPassword:''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    const name = e.target.name;
    let value = e.target.value;
    if(name==='contactNumber'){
      const regex = /^[0-9]+$/;
      console.log(regex.test(value))
      if(value!=='' && !regex.test(value))
      return;
    }
    this.setState({
      [name]:value
    });
  }

  async handleSubmit(e){
    e.preventDefault();
    if(this.state.password!==this.state.confPassword){
      alert('passwords do not match');
      return;
    }
    this.setState({
      loading:true
    });
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      contactNumber: this.state.contactNumber,
      gender: this.state.gender,
      password: this.state.password
    }
    const response = await fetch('/signup',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json);
    this.setState({
      loading:false
    });
  }

  render(){
    return (
      <>
      {
        this.state.loading?<h1>Loading...</h1>:
        <form onSubmit={e=>this.handleSubmit(e)}>
          <input name='firstName' placeholder='First Name' type='text' value={this.state.firstName} required onChange={this.handleChange} /><br />
          <input name='lastName' placeholder='Last Name' type='text' value={this.state.lastName} onChange={this.handleChange} /><br />
          <input name='email' placeholder='Email' type='email' value={this.state.email} required onChange={this.handleChange} /><br />
          <input name='contactNumber' placeholder='Contact number' type='tel' value={this.state.contactNumber} required onChange={this.handleChange} /><br />
          <select name='gender' placeholder='Gender' type='select' value={this.state.gender} required onChange={this.handleChange} >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select><br />
          <input name='password' placeholder='Password' type='password' value={this.state.password} required onChange={this.handleChange} /><br />
          <input name='confPassword' placeholder='Confirm Password' type='password' value={this.state.confPassword} required onChange={this.handleChange} /> <br/>
          <button type='submit'>SignUp</button>
        </form>
      }
      </>
    );
  }
}

export default SignUp;