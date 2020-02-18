import React from 'react'; 
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Dashboard from './components/Dashboard';
import SubmitFeedback from './components/SubmitFeedback';
import Logout from './components/Logout';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="application-form">
          <Route exact path="/" render={() => (
            <Redirect to="/signup"/>
          )}/>
          <Route path="/signup" component={SignUpForm}></Route> 
          <Route path="/signin" component={SignInForm}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/submitfeedback" component={SubmitFeedback}></Route> 
          <Route path="/logout" component={Logout}></Route>
        </div> 
      </div>
    </Router>
  );
}

export default App;
