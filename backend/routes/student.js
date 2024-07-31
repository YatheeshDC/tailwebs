const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const jwt = require('jsonwebtoken');

// Middleware to check token and extract teacherId
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'AbCDgj256@');
    req.teacherId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

// Add Student
// router.post('/add', authMiddleware, async (req, res) => {
//   const { name, subjectName, marks } = req.body;

//   console.log('Received data:', { name, subjectName, marks }); // Log request data

//   try {
//     const newStudent = new Student({ name, subjectName, marks, teacherId: req.teacherId });
//     await newStudent.save();
//     res.status(201).json({ message: 'Student added successfully' });
//   } catch (error) {
//     res.status(400).json({ message: 'Error adding student', error: error.message });
//   }
// });
router.post('/add', authenticateToken, async (req, res) => {
    const { name, subjectName, marks } = req.body;
  
    try {
      if (!name || !subjectName || !marks) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newStudent = new Student({ name, subjectName, marks });
      await newStudent.save();
  
      res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

// Get Students by Teacher
router.get('/by-teacher', authMiddleware, async (req, res) => {
  try {
    const students = await Student.find({ teacherId: req.teacherId });
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching students', error: error.message });
  }
});

module.exports = router;
