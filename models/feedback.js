const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  email: { type: String, required: true, minlength: 5 },
  comments: { type: String },
  experience: { type: Number, required: true },
}, {
  timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;