import React from "react";

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h1>Error</h1>
        <p>{errorMessage}</p>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
