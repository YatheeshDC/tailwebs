const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjectName: { type: String, required: true },
  marks: { type: Number, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Reference to teacher
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
