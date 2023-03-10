import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.2)",
    maxWidth: "80vw",
    width: "400px",
    border: "none",
    backgroundColor: "#fff",
    overflow: "visible",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export default function WinnerModal({ isOpen, onRequestClose, winner }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>{winner} won the game!</h2>
      <p>Congratulations!</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}
