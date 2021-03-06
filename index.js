const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect to MongoDB Atlas
const uri = process.env.ATLAS_CONNECTION_STRING;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db_connection = mongoose.connection;
db_connection.once('open', () => {
  console.log('Connected to MongoDB!');
});

// require and use routes
const usersRouter = require('./routes/users');
const feedbacksRouter = require('./routes/feedbacks');
app.use('/users', usersRouter);
app.use('/feedbacks', feedbacksRouter);

// relative path for static frontend
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html')); 
  })
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});