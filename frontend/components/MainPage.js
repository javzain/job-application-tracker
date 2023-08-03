import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NavigationBar from './NavBar';
import landingPageImg from '../landingPage.jpg';
import { Link } from 'react-router-dom';
import createAppImg from '../createApp.png';
import resumeImg from '../resume.png';
import sortImg from '../sort.png';


const MainPage = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Fetch a random quote from an API on mount
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setQuote(data.content);
      } catch (error) {
        console.error('Failed to fetch quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div>
      <NavigationBar />
      <Container>
        <Row className="mt-5">
          <Col md={6}>
            <img src={landingPageImg} alt="Laptop on a desk" className="img-fluid" style={{ marginTop: '100px' }} />
          </Col>
          <Col className='text-center my-auto'>
            <h1 className="text-center my-5">Your Job Application Tracker</h1>
            <p className="text-center mb-5">
              Keep track of all your job applications in one place.
            </p>
            <Link to="/my-applications">
              <Button variant="primary">Go to My Applications</Button>
            </Link>
          </Col>
        </Row>

        <Row className="my-5">
          <Col>
            <h2 className="text-center mb-5" style={{ marginTop: '100px' }}>Features</h2>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={4} className="text-center">
            <img src={createAppImg} alt="create" className="img-fluid mb-3" />
            <h4>Create and Update Applications</h4>
            <p>Easily create and update job applications to keep your job search organized and efficient.</p>
          </Col>
          <Col md={4} className="text-center">
            <img src={resumeImg} alt="resume" className="img-fluid mb-3" />
            <h4>Attach Resumes</h4>
            <p>Attach resumes to applications to keep track of which resumes you have sent to which employers.</p>
          </Col>
          <Col md={4} className="text-center">
            <img src={sortImg} alt="create" className="img-fluid mb-3" />
            <h4>Sort and Organize</h4>
            <p>Sort and organize your applications based on intelligent metrics such as company name, job title, and skills required.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <blockquote className="blockquote text-center mt-5">
              <p>{quote}</p>
            </blockquote>
          </Col>
        </Row>
        <hr />
        <footer className="text-center my-3">
          <Link to="/main">Home</Link> | <Link to="/my-applications">My Applications</Link> | <Link to="/Contact">Contact</Link> | <Link to="/logout">Logout</Link>
        </footer>
      </Container>
    </div>
  );
};

export default MainPage;
