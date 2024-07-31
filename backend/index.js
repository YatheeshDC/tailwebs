// app.js
require('dotenv').config(); 
const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const studentRoutes=require('./routes/student')
const app = express();



const User=require('./models/user');
const MbsUsers = require('./models/user');

app.use(cors());
app.use(express.json());

// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors());


// Routes

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
 


app.post('/register', async (req, res) => {
  const { userName, userEmail, userPassword} = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    const newUser = new User({ userName, userEmail, userPassword: hashedPassword});
    await newUser.save();

    
    const token = jwt.sign(
      { id: newUser._id, email: newUser.userEmail },
       'AbCDgj256@',
      { expiresIn: '24h' }
    );

    //
    res.status(201).json({ message: "User registered successfully", token: token });
  } catch (error) {
    console.log(error); 
    res.status(400).json({ error: error.message });
  }
});

app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await MbsUsers.findOne({ userEmail: email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    
    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (isMatch) {
      // Create a token
      const token = jwt.sign(
        { id: user._id, email: user.userEmail },  
        'AbCDgj256@',
        { expiresIn: '4d' }  
      );
    
      res.json({ message: "Login successful",token:token,
      userName: user.userName ,
      userEmail:user.userEmail,
      id:user._id});
    } else {
      res.status(401).json("Password is incorrect");
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json("Internal Server Error");
  }
});
// Database connection
mongoose.connect('mongodb://localhost:27017/teacher-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Database connection error:', err);
});

const studentSchema = new mongoose.Schema({
  name: String,
  subject: String,
  mark: Number
});

const Student = mongoose.model('Students', studentSchema);


// app.use(cors());
// app.use(express.json());

// app.post('/api/students/add', async (req, res) => {
//   const { name, subjectName, marks } = req.body;
//   if (!name || !subjectName || marks === undefined) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   try {
//     const student = new Student({ name, subjectName, marks });
//     await student.save();
//     res.status(200).json({ message: 'Student added successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error adding student', error: err.message });
//   }
// });

app.post('/students', (req, res) => {
  const { name, subject, mark } = req.body;
  const newStudent = new Student({ name, subject, mark });
  newStudent.save()
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

 

app.get('/students', (req, res) => {
  Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});


 


app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.name = req.body.name || student.name;
    student.subject = req.body.subject || student.subject;
    student.mark = req.body.mark || student.mark;

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




app.delete('/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log(`Attempting to delete student with id: ${studentId}`);

    // Ensure the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      console.log(`Student with id ${studentId} not found`);
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted' });
    console.log(`Student with id ${studentId} deleted successfully`);
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


 
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// // server.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Create an Express app
// const app = express();

// // Enable CORS for all origins (or specify your frontend origin)
// app.use(cors());

// // Parse JSON requests
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// // Define a schema and model for students
// // const studentSchema = new mongoose.Schema({
// //   name: String,
// //   subjectName: String,
// //   marks: Number
// // });

// // const Student = mongoose.model('Student', studentSchema);

// // POST route to add a student
// // app.post('/api/students/add', async (req, res) => {
// //   const { name, subjectName, marks } = req.body;
// //   if (!name || !subjectName || marks === undefined) {
// //     return res.status(400).json({ message: 'Missing required fields' });
// //   }

// //   try {
// //     const student = new Student({ name, subjectName, marks });
// //     await student.save();
// //     res.status(200).json({ message: 'Student added successfully' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error adding student', error: err.message });
// //   }
// // });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

