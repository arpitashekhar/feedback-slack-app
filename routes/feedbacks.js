const router = require('express').Router();
const req = require('request');
const verifyLogin = require('./verifyToken');
let Feedback = require('../models/feedback');

router.route('/').get(verifyLogin, (request, response) => {
  Feedback.find({ "email": request.user.username })
  .then(feedbacks => {
    console.log(feedbacks);
    return response.json(feedbacks);
  })
  .catch(error => response.status(400).json(`Error: ${error}`));
});

router.route('/add').post(verifyLogin, (request, response) => {
  const email = request.body.email;
  const comments = request.body.comments;
  const experience = request.body.experience;

  const newFeedback = new Feedback({
    email: email,
    comments: comments,
    experience: experience
  });
  newFeedback.save()
  .then(() => {
    response.json({ message: 'Feedback submitted successfully' });
    const slackUrl = process.env.SLACK_URL;
    const payload = {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Your feedback is submitted successfully.\nEmail: ${email} \nComments: ${comments} \nExperience: ${experience}`
          }
        }
      ]
    }
    const options = {
      url: slackUrl,
      json: true,
      body: payload
    };
  
    req.post(options, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(body);
    });
  })
  .catch(error => response.status(400).json(`Error: ${error}`));
});

module.exports = router