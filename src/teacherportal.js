import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function TeacherPortal() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:5000/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  };

  const addStudent = (name, subject, mark) => {
    axios.post('http://localhost:5000/students', { name, subject, mark })
      .then(() => {
        fetchStudents();
      })
      .catch(error => console.error('Error adding student:', error));
  };

  const updateStudent = (id, name, subject, mark) => {
    axios.put(`http://localhost:5000/students/${id}`, { name, subject, mark })
      .then(() => {
        fetchStudents();
      })
      .catch(error => console.error('Error updating student:', error));
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        fetchStudents();
      })
      .catch(error => console.error('Error deleting student:', error));
  };
  
  const handleDeleteStudent = (studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(studentId);
        Swal.fire('Deleted!', 'Student has been deleted.', 'success');
      }
    });
  };

  const handleAddStudent = () => {
    Swal.fire({
      title: 'Add New Student',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Subject">' +
        '<input id="swal-input3" class="swal2-input" type="number" placeholder="Mark">',
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('swal-input1').value;
        const subject = document.getElementById('swal-input2').value;
        const mark = document.getElementById('swal-input3').value;

        if (name && subject && mark) {
          addStudent(name, subject, parseInt(mark));
        } else {
          Swal.showValidationMessage('Please enter all details');
        }
      }
    });
  };
const handleLogout=()=>{
  navigate('/login')
}
  const handleEditStudent = (student) => {
    Swal.fire({
      title: 'Edit Student',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Name" value="${student.name}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Subject" value="${student.subject}">` +
        `<input id="swal-input3" class="swal2-input" type="number" placeholder="Mark" value="${student.mark}">`,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('swal-input1').value;
        const subject = document.getElementById('swal-input2').value;
        const mark = document.getElementById('swal-input3').value;

        if (name && subject && mark) {
          updateStudent(student._id, name, subject, parseInt(mark));
        } else {
          Swal.showValidationMessage('Please enter all details');
        }
      }
    });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Teacher Portal</h1>
      {/* <button onClick={handlelogout}>Logout</button> */}
      <button
      onClick={handleLogout}
      style={{
        backgroundColor: '#ff5722',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'absolute',
        right: '8rem',
        top: '20px',
        marginTop:'3rem'

      }}
    >
      Logout
    </button>
      
      {students.length > 0 ? (
        <Table striped bordered hover className="mb-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Mark</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.subject}</td>
                <td>{student.mark}</td>
                <td>
                  <DropdownButton id="dropdown-basic-button" title="Options" size="sm" variant="outline-secondary">
                    <Dropdown.Item onClick={() => handleEditStudent(student)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteStudent(student._id)}>Delete</Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="text-center mb-4">
          <p>No students have been added yet.</p>
        </div>
      )}
      <Card>
        <Card.Body className="text-center">
          <Button variant="primary" onClick={handleAddStudent}>
            Add Student
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TeacherPortal;
