import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Feedback = props => (
  <tr>
    <td>{props.feedback.comments}</td>
    <td>{props.feedback.experience}</td>
    <td>{props.feedback.createdAt}</td>
  </tr>
)

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: []
    }
  }

  componentDidMount() {
    let store = JSON.parse(localStorage.getItem('login'));

    if(store && store.loggedIn) {
      axios({
        method: 'GET',
        url: 'http://localhost:5000/feedbacks/',
        headers: { token: store.token }
      })
      .then((response) => {
        if(response.data.length > 0) {
          this.setState({
            feedbacks: response.data
          });
        }
      }).catch((error) => console.log(error));
    }
  }

  feedbackList() {
    return this.state.feedbacks.map((currentFeedback, index ) => {
      return <Feedback key={index} feedback={currentFeedback}/>
    });
  }

  render() {
    return (
      <div>
        <Link to="/logout" className="link">Log Out</Link>
        <h1>Welcome! </h1>
        <br/><br/>
        <table>
          <thead>
            <tr>
              <td>Comments</td>
              <td>Experience</td>
              <td>Submitted</td>
            </tr>
          </thead>
          <tbody>
            {this.feedbackList()}
          </tbody>
        </table>
        <br/><br/>
        <Link to="/submitfeedback" className="item feedback-btn">Submit New Feedback</Link>
      </div>
    )
  }
}

export default Dashboard;