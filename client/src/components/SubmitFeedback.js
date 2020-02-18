import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Alert = props => (
  <div className="alert">{props.message}</div>
)

class SubmitFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      comments: '',
      experience: '',
      message: ''
    }

    this.inputChange = this.inputChange.bind(this);
    this.submitFeedback = this.submitFeedback.bind(this);
  }

  inputChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value 
    });
  }

  submitFeedback(e) {
    e.preventDefault();
    const feedback = {
      email: this.state.email,
      comments: this.state.comments,
      experience: this.state.experience
    }

    let store = JSON.parse(localStorage.getItem('login'));

    if(store && store.loggedIn) {
      axios({
        method: 'POST',
        url: '/feedbacks/add',
        headers: { token: store.token },
        data: feedback
      })
      .then((response) => {
        this.setState({ message: response.data.message });
      }).catch((error) => this.setState({ message: 'Please enter all the fields' }));
    }
  }

  render() {
    return (
      <div>
        <Link to="/dashboard" className="link">Dashboard</Link>
        <Link to="/logout" className="link">Log Out</Link>
        <div className="form-center">
          {this.state.message!==''?<Alert message={this.state.message}/>:null}

          <h2>Your feedback is very important to us! </h2>
          <form onSubmit={this.submitFeedback}>
            <div>
              <label  className="form-field" htmlFor="email">Email</label>
              <input name="email" value={this.state.email} type="email" className="form-field" placeholder="Enter email" onChange={this.inputChange} />
            </div>
            <div>
              <label  className="form-field" htmlFor="comments">Comments</label>
              <input name="comments" value={this.state.comments} type="text" className="form-field" placeholder="Enter Comments" onChange={this.inputChange} />
            </div>
            <div>
              <label  className="form-field" htmlFor="experience">Rate your experience (0 - 10)</label>
              <input name="experience" value={this.state.experience} type="number" pattern="[0-9]*" inputMode="numeric" max={10} min={0} className="form-field" onChange={this.inputChange} />
            </div>
          
            <button type="submit" className="form-field">Submit Feedback</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SubmitFeedback;