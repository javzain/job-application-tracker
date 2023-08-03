import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send a POST request to the Spring Boot backend with the login data
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true
      });

      // After a successful login, navigate to the main page
      navigate('/main');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error.response.data);
      setIsSubmitting(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="text-center mb-4">Login</h1>
          {errorMessage && (
            <Alert variant="danger" className="text-center">
              {errorMessage}
            </Alert>
          )}
          <Form onSubmit={handleLogin}>
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
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
              <Button variant="secondary" onClick={goToRegister} className="mt-3">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
