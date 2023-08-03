import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ title, message, confirmText, cancelText, onConfirm, onCancel }) => {
  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>{cancelText}</Button>
        <Button variant="primary" onClick={onConfirm}>{confirmText}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
