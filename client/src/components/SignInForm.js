import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      store: null
    }

    this.inputChange = this.inputChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn(e) {
    e.preventDefault();
    console.log("sign in called: ", this.state);
    axios.post('/users/signin', {
      username: this.state.email,
      password: this.state.password
    }).then((response) => {
      console.log(response);
      if(response.status === 200) {
        localStorage.setItem('login', JSON.stringify({
          loggedIn: true,
          token: response.data.token,
          user: this.state.email
        }));
        this.setState({ loggedIn: true });
        window.location = '/dashboard';
      }
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
          <form onSubmit={this.signIn}>
            <div>
              <label  className="form-field" htmlFor="email">Email</label>
              <input name="email" value={this.state.email} type="email" className="form-field" placeholder="Enter email" onChange={this.inputChange} />
            </div>
            <div>
              <label  className="form-field" htmlFor="password">Password</label>
              <input name="password" value={this.state.password} type="password" className="form-field" placeholder="Enter Password" onChange={this.inputChange} />
            </div>
          
            <button type="submit" className="form-field">Sign In</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignInForm;