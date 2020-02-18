import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount() {
    let store = JSON.parse(localStorage.getItem('login'));

    if(store) {
      localStorage.removeItem('login');
    } else {
      localStorage.clear();
    }
  }

  render() {
    return (
      <Redirect to="/signin"/>
    )
  }
}

export default Logout;