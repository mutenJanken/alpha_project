import React from "react";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";

const ProjectOptionsMenu = () => {
  return (
    <div className="menu-container">
      <div className="menu-open">
        <div className="menu-button edit">
          <img className="edit-icon" src={EditIcon} alt="edit-icon" />
          <div className="edit-text">Edit</div>
        </div>
        <div className="menu-button delete">
          <img className="delete-icon" src={DeleteIcon} alt="" />
          <div className="delete-text">Delete Project</div>
        </div>
      </div>
      <div className="box-shadow-behind-menu">bakom</div>
    </div>
  );
};

export default ProjectOptionsMenu;
