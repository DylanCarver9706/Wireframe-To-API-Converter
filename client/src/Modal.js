import React from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h1>Your API is Being Generated!</h1>
        <h3>Enjoy Your Python Flask API App!</h3>
        <h2>Please Consider Donating Below to Support the Expansion of the App</h2>
        <div className="donate-buttons">
          <button>
            <a
              href="https://www.paypal.com/paypalme/DylanCarver9706?country.x=US&locale.x=en_US"
              target="_blank"
              rel="noopener noreferrer"
            >
                PayPal
            </a>
          </button>
          <button>
            <a
              href="https://cash.app/$DylanCarver14"
              target="_blank"
              rel="noopener noreferrer"
            >
                CashApp
            </a>
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <button onClick={onClose} className="close-button">
          No thanks
        </button>
      </div>
    </div>
  );
};

export default Modal;
