import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Alert = props => (
  <div className="alert">{props.message}</div>
)

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      message: ''
    }

    this.inputChange = this.inputChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  
  signUp(e) {
    e.preventDefault();
    console.log("sign up called: ", this.state);

    axios.post('http://localhost:5000/users/signup', {
      "username": this.state.email,
      "password": this.state.password,
      "name": this.state.name
    })
    .then((response) => { 
      this.setState({ message: response.data.message })
    })
    .catch((error) => {
      this.setState({ message: "Please verify the signup details" })
    });
  }

  inputChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value 
    });
  }

  render() {
    return (
      <div>
        <div className="login-register-switch">
          <NavLink to="/signin" className="item" activeClassName="active-item">Sign In</NavLink>
          <NavLink to="/signup" className="item" activeClassName="active-item">Sign Up</NavLink>
        </div>
        <div className="form-center">
          {this.state.message!==''?<Alert message={this.state.message}/>:null}
          <form onSubmit={this.signUp}>
            <div>
              <label  className="form-field label" htmlFor="fullname">Full Name</label>
              <input name="name" value={this.state.name} type="name" className="form-field input" placeholder="Enter Name" onChange={this.inputChange} />
            </div>
            <div>
              <label  className="form-field label" htmlFor="email">Email</label>
              <input name="email" value={this.state.email} type="email" className="form-field input" placeholder="Enter email" onChange={this.inputChange} />
            </div>
            <div>
              <label  className="form-field label" htmlFor="password">Password</label>
              <input name="password" value={this.state.password} type="password" className="form-field input" placeholder="Enter Password" onChange={this.inputChange} />
            </div>

            <button type="submit" className="form-field">Sign Up</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUpForm;