import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './CustomModal';
import { Button } from 'react-bootstrap';

const Logout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [previousLocation, setPreviousLocation] = useState(null);

  const handleConfirm = async () => {
    setShowModal(false);
    try {
      await axios.post('http://localhost:8080/logout', {}, {
        withCredentials: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/login');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    if (previousLocation) {
      navigate(previousLocation.pathname);
    } else {
      navigate('/main');
    }
  };

  const handleLogout = () => {
    setPreviousLocation(window.location);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <Modal
          title="Logout"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={handleConfirm}
          onCancel={handleClose}
        />
      )}
      <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default Logout;
