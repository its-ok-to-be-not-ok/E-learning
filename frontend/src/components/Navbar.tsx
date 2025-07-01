import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/student-dashboard">Student Dashboard</Link></li>
        <li><Link to="/teacher-dashboard">Teacher Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; 