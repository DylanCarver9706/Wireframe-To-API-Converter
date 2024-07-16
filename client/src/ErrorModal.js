import React from "react";

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h1 className="error-title">Error</h1>
        <h2>{errorMessage}</h2>
        <button onClick={onClose} className="close-button">
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
