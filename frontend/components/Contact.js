import React, { useState } from 'react';
import NavigationBar from './NavBar';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const mailtoLink = `mailto:dailytechunlocked@gmail.com?subject=Contact form submission from ${name}&body=${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <h1>Contact Us!</h1>
        <p>Need help? We're here for you. Contact us using the form below and we'll get back to you as soon as possible!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" id="message" rows="5" value={message} onChange={handleMessageChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
      <hr />
      <footer className="text-center my-3">
        <Link to="/main">Home</Link> | <Link to="/my-applications">My Applications</Link> | <Link to="/contact">Contact</Link> | <Link to="/logout">Logout</Link>
      </footer>
    </div>
  );
};

export default Contact;
