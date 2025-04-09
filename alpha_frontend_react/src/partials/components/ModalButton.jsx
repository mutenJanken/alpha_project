import React from "react";

const ModalButton = ({ type, target, text, toggleModal, setShowStatusSelect }) => {
  return (
    <button
      type="button"
      data-modal="true"
      data-target={target}
      className={`btn btn-${type}`}
      onClick={() => {
        setShowStatusSelect(false);
        toggleModal();
      }}
    >
      <span>{text}</span>
    </button>
  );
};

export default ModalButton;
