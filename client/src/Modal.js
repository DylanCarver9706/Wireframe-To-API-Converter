import React from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h1>API Generated Successfully!</h1>
        <h3>Your database is downloading into an API.</h3>
        <h2>Please Consider Donating Below to Support the Expansion of the App</h2>
        <div className="donate-buttons">
          <button>
            <a
              href="https://www.paypal.com/paypalme/DylanCarver9706?country.x=US&locale.x=en_US"
              target="_blank"
              rel="noopener noreferrer"
            >
                PayPal
              {/* <img src="/paypal-button.png" alt="paypal"/> */}
            </a>
          </button>
          <button>
            <a
              href="https://cash.app/$DylanCarver14"
              target="_blank"
              rel="noopener noreferrer"
            >
                CashApp
              {/* <img src="/cashapp-button.png" alt="cashapp"/> */}
            </a>
          </button>
          <button>
            <a
              href="https://venmo.com/u/Dylan-Carver-7"
              target="_blank"
              rel="noopener noreferrer"
            >
                Venmo
              {/* <img src="/venmo-button.png" alt="venmo"/> */}
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
