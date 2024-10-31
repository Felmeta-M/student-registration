const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  course: { type: String, required: [true, 'Course is required'] },
  contact: { type: String, required: [true, 'Contact information is required'] }
});

module.exports = mongoose.model('Student', studentSchema);
