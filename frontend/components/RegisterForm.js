import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/tracker/register', {
        username,
        password,
      });

      // After a successful registration, navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="text-center mb-4">Register</h1>
          {errorMessage && (
            <Alert variant="danger" className="text-center">
              {errorMessage}
            </Alert>
          )}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="username">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex flex-column">
              <Button variant="primary" type="submit" block>
                Register
              </Button>
              <Button variant="secondary" onClick={goToLogin} className="mt-3" block>
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
