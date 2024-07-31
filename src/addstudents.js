// // src/components/AddStudent.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddStudent.css';

// const AddStudent = ({ onStudentAdded }) => {
//   const [name, setName] = useState('');
//   const [subjectName, setSubjectName] = useState('');
//   const [marks, setMarks] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setMessage('No authentication token found. Please log in again.');
//         return;
//       }
  
//       await axios.post('http://localhost:5000/api/students/add', {
//         name,
//         subjectName,
//         marks,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       setMessage('Student added successfully');
//       setName('');
//       setSubjectName('');
//       setMarks('');
//       onStudentAdded();
//     } catch (error) {
//       if (error.response) {
//         setMessage(`Error: ${error.response.data.message || 'Unable to add student'}`);
//       } else if (error.request) {
//         setMessage('Error: No response from server. Please try again later.');
//       } else {
//         setMessage(`Error: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Add Student</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Student Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Subject Name"
//           value={subjectName}
//           onChange={(e) => setSubjectName(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Marks"
//           value={marks}
//           onChange={(e) => setMarks(e.target.value)}
//           required
//         />
//         <button type="submit">Add Student</button>
//       </form>
//     </div>
//   );
// };

// export default AddStudent;

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddStudent = ({ onStudentAdded }) => {
  const [name, setName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [marks, setMarks] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No authentication token found. Please log in again.');
        return;
      }

      await axios.post('http://localhost:5000/api/students/add', {
        name,
        subjectName,
        marks,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: 'Success!',
        text: 'Student added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setName('');
      setSubjectName('');
      setMarks('');
      onStudentAdded();
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Unable to add student'}`);
      } else if (error.request) {
        setMessage('Error: No response from server. Please try again later.');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f5f5f5',
    padding: '2rem'
  };

  const formStyle = {
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease-in-out'
  };

  const formContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s ease-in-out'
  };

  const inputFocusStyle = {
    borderColor: '#ff1744'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ff1744',
    borderColor: '#ff1744',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out'
  };

  const buttonHoverStyle = {
    backgroundColor: '#d50000',
    borderColor: '#d50000'
  };

  const messageStyle = {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h2>Add Student</h2>
      {message && <p style={messageStyle}>{message}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formContentStyle}>
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = inputFocusStyle.borderColor)}
            onBlur={(e) => (e.target.style.borderColor = inputStyle.borderColor)}
          />
          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = inputFocusStyle.borderColor)}
            onBlur={(e) => (e.target.style.borderColor = inputStyle.borderColor)}
          />
          <input
            type="number"
            placeholder="Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = inputFocusStyle.borderColor)}
            onBlur={(e) => (e.target.style.borderColor = inputStyle.borderColor)}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
