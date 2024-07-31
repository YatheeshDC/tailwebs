
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Marks = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'Sean Abot', subject: 'Maths', mark: 77 },
        { id: 2, name: 'Shawn Tate', subject: 'English', mark: 72 },
        { id: 3, name: 'Shivam', subject: 'Physics', mark: 78 },
        { id: 4, name: 'Mitchelle', subject: 'Maths', mark: 78 },
        { id: 5, name: 'Shiv Yadav', subject: 'Chemistry', mark: 80 },
        { id: 6, name: 'Shiv Yadav', subject: 'Hindi', mark: 76 },
        { id: 7, name: 'Shiv Yadav', subject: 'Physics', mark: 77 }
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const handleAddOrEdit = () => {
        Swal.fire({
            title: isEditing ? 'Edit Student' : 'Add Student',
            html: `
                <input type="text" id="name" class="swal2-input" placeholder="Name" value="${isEditing && editingStudent ? editingStudent.name : ''}">
                <input type="text" id="subject" class="swal2-input" placeholder="Subject" value="${isEditing && editingStudent ? editingStudent.subject : ''}">
                <input type="number" id="mark" class="swal2-input" placeholder="Mark" value="${isEditing && editingStudent ? editingStudent.mark : ''}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const subject = document.getElementById('subject').value;
                const mark = document.getElementById('mark').value;

                if (!name || !subject || !mark) {
                    Swal.showValidationMessage('Please fill out all fields.');
                    return false;
                }

                return { name, subject, mark };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, subject, mark } = result.value;

                if (isEditing) {
                    setStudents(students.map(student =>
                        student.id === editingStudent.id ? { ...student, name, subject, mark: parseInt(mark) } : student
                    ));
                    Swal.fire('Success', 'Student details updated successfully!', 'success');
                } else {
                    setStudents([...students, { id: Date.now(), name, subject, mark: parseInt(mark) }]);
                    Swal.fire('Success', 'Student added successfully!', 'success');
                }

                setIsEditing(false);
                setEditingStudent(null);
            }
        });
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setIsEditing(true);
        handleAddOrEdit();
    };

    const handleDelete = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            color: '#333'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px'
        },
        thTd: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left'
        },
        th: {
            backgroundColor: '#f2f2f2'
        },
        trEven: {
            backgroundColor: '#f9f9f9'
        },
        dropdown: {
            position: 'relative',
            display: 'inline-block'
        },
        dropdownContent: {
            display: 'none',
            position: 'absolute',
            backgroundColor: '#f1f1f1',
            minWidth: '160px',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            zIndex: 1,
        },
        dropdownContentShow: {
            display: 'block'
        },
        dropdownItem: {
            color: 'black',
            padding: '12px 16px',
            textDecoration: 'none',
            display: 'block',
            cursor: 'pointer'
        },
        addButton: {
            display: 'block',
            width: '100%',
            backgroundColor: '#007BFF',
            color: 'white',
            fontSize: '16px',
            marginTop: '10px',
            padding: '10px 0'
        }
    };

    const toggleDropdown = (id) => {
        const element = document.getElementById(`dropdown-content-${id}`);
        if (element.style.display === 'block') {
            element.style.display = 'none';
        } else {
            element.style.display = 'block';
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Student Marks</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={{ ...styles.thTd, ...styles.th }}>Name</th>
                        <th style={{ ...styles.thTd, ...styles.th }}>Subject</th>
                        <th style={{ ...styles.thTd, ...styles.th }}>Mark</th>
                        <th style={{ ...styles.thTd, ...styles.th }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} style={index % 2 === 0 ? styles.trEven : null}>
                            <td style={styles.thTd}>{student.name}</td>
                            <td style={styles.thTd}>{student.subject}</td>
                            <td style={styles.thTd}>{student.mark}</td>
                            <td style={styles.thTd}>
                                <div style={styles.dropdown}>
                                    <button onClick={() => toggleDropdown(student.id)}>Options</button>
                                    <div id={`dropdown-content-${student.id}`} style={{ ...styles.dropdownContent }}>
                                        <div style={styles.dropdownItem} onClick={() => handleEdit(student)}>Edit</div>
                                        <div style={styles.dropdownItem} onClick={() => handleDelete(student.id)}>Delete</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button style={styles.addButton} onClick={handleAddOrEdit}>Add Student</button>
        </div>
    );
};

export default Marks;

