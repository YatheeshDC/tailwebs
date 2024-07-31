// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Button, Form, Card } from 'react-bootstrap';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     axios.post("http://localhost:5000/login", { email, password })
//       .then(result => {
//         setLoading(false);
//         if (result.data.message === "Login successful") {
//           localStorage.setItem('token', result.data.token);
//           navigate("/teacherPortal");
//         } else {
//           setError("Invalid email or password. Please try again.");
//         }
//       })
//       .catch(error => {
//         setLoading(false);
//         setError("An error occurred. Please try again later.");
//       });
//   }

//   return (
//     <>
   
//       <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10rem' }}>
//         <Card style={{ width: '25rem' }}>
//           {error && <div className="alert alert-info">{error}</div>}
//           <Form onSubmit={handleSubmit}>
//             <div className='px-4'>
//               <p className='fs-5'>Login</p>
//               <Form.Group className="mb-3">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
//               </Form.Group>
//               <Button type='submit' variant='danger' disabled={loading}>
//                 {loading ? 'Logging in...' : 'Continue'}
//               </Button>
//             </div>
//           </Form>
//         </Card>
//       </div>
//     </>
//   );
// }

// export default Login;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('No authentication token found. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudents(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Server responded with error:', error.response.data);
          setMessage(`Error: ${error.response.data.message || 'Unable to fetch students'}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          setMessage('Error: No response from server. Please try again later.');
        } else {
          console.error('Error setting up request:', error.message);
          setMessage(`Error: ${error.message}`);
        }
      }
    };

    fetchStudents();
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
    padding: '2rem'
  };

  const listStyle = {
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease-in-out',
    listStyle: 'none',
    paddingLeft: 0
  };

  const listItemStyle = {
    padding: '10px',
    borderBottom: '1px solid #ccc'
  };

  const messageStyle = {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h2>Student List</h2>
      {message && <p style={messageStyle}>{message}</p>}
      {students.length > 0 ? (
        <ul style={listStyle}>
          {students.map((student) => (
            <li key={student._id} style={listItemStyle}>
              {student.name} - {student.subjectName} - {student.marks}
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default StudentList;
