// src/components/MyApplications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavBar';
import { Modal, Button, Dropdown, Card, Row, Col, Form } from 'react-bootstrap';
import EditApplicationForm from './EditApplicationForm';
import CreateApplicationForm from './CreateApplicationForm';
import '../display.css';
import { Link } from 'react-router-dom';


const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortKey, setSortKey] = useState('id');
  const [searchQuery, setSearchQuery] = useState('');


  const handleClose = () => setShowModal(false);
  const handleShow = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCreateClose = () => setShowCreateModal(false);
  const handleCreateShow = () => setShowCreateModal(true);

  const onApplicationCreated = async () => {
    await fetchApplications();
    handleClose();
    handleCreateClose();
  };


  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tracker/getAllApps', {
        withCredentials: true,
      });
      console.log('Response data:', response.data);
      setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [sortKey]);


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterApplications = (apps) => {
    return apps.filter((app) => {
      const query = searchQuery.toLowerCase();
      const nameMatch = app.name && app.name.toLowerCase().includes(query);
      const companyMatch = app.company && app.company.toLowerCase().includes(query);
      const skillMatch = app.resume && app.resume.skills.some(skill => skill.toLowerCase().includes(query));
      return nameMatch || companyMatch || skillMatch;

    });

  };

  const filteredApplications = filterApplications(applications);

  const handleDelete = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axios.delete(`http://localhost:8080/tracker/deleteApp/${applicationId}`, {
          withCredentials: true,
        });
        setApplications(applications.filter((application) => application.id !== applicationId));
      } catch (error) {
        console.error('Failed to delete application:', error);
      }
    }
  };

  const handleSort = (key) => {
    setSortKey(key);
    setApplications([...sortApplications(applications, key)]);
  };

  const sortApplications = (apps, key) => {
    const sortedApps = [...apps];
    switch (key) {
      case 'status':
        return sortedApps.sort((a, b) => a.status.localeCompare(b.status));
      case 'company':
        return sortedApps.sort((a, b) => a.company.localeCompare(b.company));
      case 'salary':
        return sortedApps.sort((a, b) => parseSalaryRange(a.job.salary) - parseSalaryRange(b.job.salary));
      default:
        return apps;
    }
  };

  const parseSalaryRange = (salaryRange) => {
    if (!salaryRange) return 0;
    const numbers = salaryRange.match(/\d+/g);
    if (!numbers) return 0;
    return numbers.reduce((sum, num) => sum + parseInt(num, 10), 0) / numbers.length;
  };

  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <h1>My Applications</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className='d-flex'>
            <div className='mr-3'>
              <Form.Control
                type="text"
                placeholder="Search by application name, company, or skill"
                value={searchQuery}
                onChange={handleSearch}
                className="form-control"
                style={{ width: '500px' }}
              />
            </div>
            <Dropdown onSelect={handleSort}>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-sort">
                Sort By
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="default">Default</Dropdown.Item>
                <Dropdown.Item eventKey="status">Status</Dropdown.Item>
                <Dropdown.Item eventKey="company">Company</Dropdown.Item>
                <Dropdown.Item eventKey="salary">Salary</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
          <Button variant="success" onClick={handleCreateShow}>
            Create New Application
          </Button>
        </div>
        <Row>
          {filteredApplications.map((application) => (
            <Col key={application.id} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Header>
                  <Card.Title className="mb-0">{application.name || 'N/A'}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    Company: {application.company || 'N/A'}
                  </Card.Subtitle>
                  <Card.Text>
                    Status: {application.status || 'N/A'}
                  </Card.Text>
                  {application.job && (
                    <>
                      <Card.Subtitle className="mb-2 mt-3 jobDet">Job Details</Card.Subtitle>
                      <Card.Text>
                        <div className="job-details">
                          <div>
                            <span className="attribute">Technical Skills:</span>
                            <span className="value">{application.job.technicalSkills ? application.job.technicalSkills.join(", ") : "N/A"}</span>
                          </div>
                          <div>
                            <span className="attribute">Soft Skills:</span>
                            <span className="value">{application.job.softSkills ? application.job.softSkills.join(", ") : "N/A"}</span>
                          </div>
                          <div>
                            <span className="attribute">Education:</span>
                            <span className="value">{application.job.education || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="attribute">Experience:</span>
                            <span className="value">{application.job.experience || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="attribute">Post Date:</span>
                            <span className="value">{application.job.postDate ? new Date(application.job.postDate).toLocaleDateString() : "N/A"}</span>
                          </div>
                          <div>
                            <span className="attribute">Close Date:</span>
                            <span className="value">{application.job.closeDate ? new Date(application.job.closeDate).toLocaleDateString() : "N/A"}</span>
                          </div>
                          <div>
                            <span className="attribute">Source:</span>
                            <span className="value">{application.job.source || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="attribute">URL:</span>
                            <span className="value">{application.job.url || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="attribute">Salary:</span>
                            <span className="value">{application.job.salary || 'N/A'}</span>
                          </div>
                        </div>
                      </Card.Text>
                    </>
                  )}
                  <Button variant="primary" onClick={() => handleShow(application)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(application.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
              {application.resume && (
                <Card className="mt-3">
                  <Card.Header>
                    <Card.Title className="mb-0">{application.name}: Resume Information</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Highest Qualification: {application.resume.highestQualification || 'N/A'}
                      <br />
                      Experience Years: {application.resume.experienceYears || 'N/A'}
                      <br />
                      Companies Worked At: {application.resume.companiesWorkedAt
                        ? application.resume.companiesWorkedAt.join(", ")
                        : "N/A"}
                      <br />
                      Projects: {application.resume.projects
                        ? application.resume.projects.join(", ")
                        : "N/A"}
                      <br />
                      Skills: {application.resume.skills
                        ? application.resume.skills.join(", ")
                        : "N/A"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>
          ))}
        </Row>


      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <EditApplicationForm
              application={selectedApplication}
              onUpdateSuccess={onApplicationCreated}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCreateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateApplicationForm onCreateSuccess={onApplicationCreated} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <hr />
      <footer className="text-center my-3">
        <Link to="/main">Home</Link> | <Link to="/my-applications">My Applications</Link> 
        | <Link to="/contact">Contact</Link> | <Link to="/logout">Logout</Link>
      </footer>
    </div>
  );





};

export default MyApplications;

