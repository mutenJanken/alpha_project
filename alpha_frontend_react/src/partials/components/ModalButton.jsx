import React from "react";

const ModalButton = ({ type, target, text, handleModalToggle, setShowStatusSelect }) => {
  return (
    <button
      type="button"
      data-modal="true"
      data-target={target}
      className={`btn btn-${type}`}
      onClick={() => {
        setShowStatusSelect(false);
        handleModalToggle();
      }}
    >
      <span>{text}</span>
    </button>
  );
};

export default ModalButton;
