// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Register from './register';
// import Login from './Login';
import Signup from './register';
import Login from './Login';
// import AddStudent from './addstudents';
import TeacherPortal from './teacherportal';
import Marks from './Marks';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Signup />} />
                <Route path='/teacherPortal' element={<TeacherPortal/>}/>

                <Route path="/marks" element={<Marks />} />
            </Routes>
        </Router>
    );
};

export default App;
