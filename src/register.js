// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Card from 'react-bootstrap/Card';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";

 
// function  Signup() {
//   const [formData, setFormData] = useState({
//     userName: '',
//     userEmail: '',
//     userPassword: ''
//   });
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/register', formData);
//       console.log('Registered Successfully:', response.data);
//       navigate('/login')
//     } catch (error) {
//       console.error('Registration Error:', error);
//     }
//   };

//   return (
//     <>
//     <div className='d-flex justify-content-center align-items-center mt-4 mb-4'>
//     <Card style={{ width: '25rem' ,height:'85vh',border:'1px solid lightgray',backgroundColor:'ffff' }}>
//     <Form onSubmit={handleSubmit}   >
//         <div className='px-4'>
//       <Form.Group className="mb-3" controlId="formBasicName">
//         <Form.Label> Name</Form.Label>
//         <Form.Control type="text"  
//          name="userName"
//          value={formData.userName}
//          onChange={handleChange}
//          placeholder="Name"
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email"  
//          name="userEmail"
//          value={formData.userEmail}
//          onChange={handleChange}
//          placeholder="Email" />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" 
//           name="userPassword"
//           value={formData.userPassword}
//           onChange={handleChange}
//           placeholder="Password" />
//       </Form.Group>
    
//       <Button  type='submit'  variant='danger' style={{borderColor:'red'  ,width:'80%'}} className='mx-2'>
//            Sign Up 
//                 </Button>
//                 <Form.Group className="mb-3  mt-2 d-flex justify-content-center "   >
//           <Form.Text>Already registered?</Form.Text> 
//           <Link to='/Login' style={{color:'red'}}>Login Now</Link>
//         </Form.Group> 
//       </div>
//     </Form>
//     </Card>
//     </div>
//     </>
//   );
// }

// export default Signup;
 

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log('Registered Successfully:', response.data);
      
      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'You have registered successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/login');
      });

    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)'
  };

  const cardStyle = {
    width: '25rem',
    padding: '20px',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease-in-out'
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)'
  };

  const formContentStyle = {
    padding: '10px 20px'
  };

  const inputGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const iconStyle = {
    width: '24px',
    height: '24px',
    fill: '#9c27b0'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#e91e63',
    borderColor: '#e91e63',
    transition: 'background-color 0.3s ease-in-out'
  };

  const buttonHoverStyle = {
    backgroundColor: '#d81b60',
    borderColor: '#d81b60'
  };

  const linkStyle = {
    color: '#9c27b0',
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out'
  };

  const linkHoverStyle = {
    color: '#7b1fa2'
  };

  return (
    <>
      <div style={containerStyle}>
        <Card style={cardStyle}>
          <Form onSubmit={handleSubmit}>
            <div style={formContentStyle}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <div style={inputGroupStyle}>
                  <svg style={iconStyle} viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <Form.Control 
                    type="text"  
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <div style={inputGroupStyle}>
                  <svg style={iconStyle} viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <Form.Control 
                    type="email"  
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    placeholder="Email" 
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div style={inputGroupStyle}>
                  <svg style={iconStyle} viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <Form.Control 
                    type="password" 
                    name="userPassword"
                    value={formData.userPassword}
                    onChange={handleChange}
                    placeholder="Password" 
                  />
                </div>
              </Form.Group>
              <Button 
                type='submit' 
                style={buttonStyle} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
              >
                Sign Up
              </Button>
              <Form.Group className="mt-2 text-center">
                <Form.Text>Already registered?</Form.Text>
                <Link 
                  to='/login' 
                  style={linkStyle}
                  onMouseOver={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                  onMouseOut={(e) => e.currentTarget.style.color = linkStyle.color}
                >
                  Login Now
                </Link>
              </Form.Group>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Signup;
