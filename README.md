# Submit Feedback - Slack Integration

This is a [single-page application](https://fathomless-shore-88700.herokuapp.com) that allows users to create an account and submit one-way feedback via a simple form. The form captures user's feedback and stores it on the server and also sending the feedback to the Slack webhook. Users should can log back in and view the history of their feedback.

## Getting Started

The client-side code was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The server uses Node.js and MongoDB Atlas cluster to store the data.

### Prerequisites

Node - v13.8.0
Npm - v6.13.7
Git

### Installing (Dev Environment)

* Clone this repository:
```
git clone https://github.com/arpitashekhar/feedback-slack-app.git
```

* Set the following environment variables to .env file (root folder)
```
* ATLAS_CONNECTION_STRING
* SECRET_TOKEN
* SLACK_URL
```

* Run `yarn && yarn start` in root and client directory to setup the client ans server.

* Application can be accessed locally at: `http://localhost:3000`. The server runs at default port `5000`.

## Implementation

### Security

* The user password is encrypted using the 'bcrypt'.
* Application uses JSON Web Tokens to authenticate users, which are stored in the local storage.

### Routes

The application has following routes:
* /signin - Login to the app
* /signup - Add a new user
* /submitfeedback - To submit a new feedback, triggers the slack webhook
* /dashboard - Displays the history of submitted feedbacks for the user
* /logout - Logs the user out