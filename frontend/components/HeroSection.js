import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <section className="hero-section bg-light">
      <Container>
        <Row>
          <Col md={7}>
            <h1 className="hero-headline">Welcome to the Job Application Tracker</h1>
            <p className="hero-subheadline">
              Keep track of all your job applications in one place and stay organized.
            </p>
          </Col>
          <Col md={5}>
            <Image src="landingPage.jpg" alt="Job Application Tracker" fluid />
          </Col>
        </Row>
      </Container>
    </section> 
  );
};

export default HeroSection;
