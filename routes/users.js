const router = require('express').Router();
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
let User = require('../models/user');

router.use(cors())

router.route('/signin').post((request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  User.findOne({ username: username })
  .then(user =>  {
    if(!user) {
      return response.status(404).json({ message: 'User does not exist' });
    }

    bcrypt.compare(password, user.password, function(error, isMatch) {
      if(isMatch) {
        // create payload
        const payload = {
          _id: user._id,
          username: user.username
        }

        // create and assign a token
        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '1h' }, (error, token) => {
          if(!error) {
            return response.json({ message: 'Logged In!', token: token });
          }
        });

      } else {
        return response.status(404).json({ message: 'Incorrect Password' });
      }
    });
  });
})

router.route('/signup').post((request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  const name = request.body.name;

  if(!username || !password) {
    return response.status(422).send({ message: 'Please enter valid username and password' });
  }

  User.find({ username: username})
  .then(user => {
    if(user.length > 0) {
      response.status(422).send({ message: 'User already exists' });
    } else {
      bcrypt.hash(password, 10, (error, hash) => {
        if(error) {
          response.status(500).json(`Error: ${error}`);
        } else {
          const newUser = new User({ 
            username: username, 
            password: hash, 
            name: name 
          });
          newUser.save()
          .then(() => response.json({ message: 'User signup successful. Please Sign In.' }))
          .catch(error => response.status(400).send(`Error: ${error}`));
        }
      });
    }
  });
});

module.exports = router;