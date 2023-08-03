import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
import RegisterForm from './RegisterForm';
import MyApplications from './MyApplications';
import Contact from './Contact';
import Logout from './Logout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route index path="/" element={<LoginForm/>} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default AppRouter;