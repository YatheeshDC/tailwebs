// // src/components/StudentList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setMessage('No authentication token found. Please log in again.');
//           return;
//         }

//         const response = await axios.get('http://localhost:5000/api/students', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setStudents(response.data);
//       } catch (error) {
//         if (error.response) {
//           console.error('Server responded with error:', error.response.data);
//           setMessage(`Error: ${error.response.data.message || 'Unable to fetch students'}`);
//         } else if (error.request) {
//           console.error('No response received:', error.request);
//           setMessage('Error: No response from server. Please try again later.');
//         } else {
//           console.error('Error setting up request:', error.message);
//           setMessage(`Error: ${error.message}`);
//         }
//       }
//     };

//     fetchStudents();
//   }, []);

//   return (
//     <div>
//       <h2>Student List</h2>
//       {message && <p>{message}</p>}
//       {students.length > 0 ? (
//         <ul>
//           {students.map((student) => (
//             <li key={student._id}>{student.name} - {student.subjectName} - {student.marks}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No students found.</p>
//       )}
//     </div>
//   );
// };

// export default StudentList;

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
    background: '#f5f5f5',
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
