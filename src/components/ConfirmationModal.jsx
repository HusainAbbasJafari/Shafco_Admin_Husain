// ConfirmationModal.jsx
"use client"
import { Modal } from 'react-bootstrap';

const ConfirmationModal = ({ show, onHide, children }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      {children}
    </Modal>
  );
};

export default ConfirmationModal;
