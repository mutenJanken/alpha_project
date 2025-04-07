import React from "react";
import { useState } from "react";
import LandingPageIcon from "../../assets/images/landing-page-icon.svg";
import ProjectOptionsMenu from "./ProjectOptionsMenu";

const ProjectCard = () => {
  const [open, setOpen] = useState(false);

  const handleMenuToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="card-container">
      <div className="card-under"></div>
      <div className="card">
        <div className="card-header">
          <img src={LandingPageIcon} alt="Landingpage icon" />
          <div className="card-header-text-container">
            <div className="card-title-menuoptions-container">
              <h6 className="card-title">Landing Page</h6>
              <small className="card-companyname">Bitbucket, Inc.</small>
            </div>
          </div>
          <div className="menu-options-container">
            <div className="menu" onClick={handleMenuToggle}>
              <i className="fa-solid fa-ellipsis options-menu-icon"></i>
              {open && <ProjectOptionsMenu />}
            </div>
          </div>
        </div>
        <p className="description">hallihallå heja jag heter emil och är cuul man</p>
      </div>
    </div>
  );
};

export default ProjectCard;
