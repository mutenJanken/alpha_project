import { useState } from "react";
import LandingPageIcon from "../../assets/images/landing-page-icon.svg";
import ProjectDropdownMenu from "./ProjectDropdownMenu";

const ProjectCard = ({ project, toggleModal, setShowStatusSelect, removeProject, setIsEditModal, setSelectedProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="card-container" key={project.id}>
      <div className="card-under"></div>
      <div className="card">
        <div className="card-header">
          <img src={LandingPageIcon} alt="Landingpage icon" />
          <div className="card-header-text-container">
            <div className="card-title-company-wrapper">
              <h6 className="card-title">{project.projectName}</h6>
              <small className="card-companyname">{project.client.clientName}</small>
            </div>
          </div>
          <div className="menu-options-container">
            <div className="menu" onClick={handleMenuToggle}>
              <i className="fa-solid fa-ellipsis options-menu-icon"></i>
              {isModalOpen && (
                <ProjectDropdownMenu
                  toggleModal={toggleModal}
                  setShowStatusSelect={setShowStatusSelect}
                  project={project}
                  removeProject={removeProject}
                  setIsEditModal={setIsEditModal}
                  setSelectedProject={setSelectedProject}
                />
              )}
            </div>
          </div>
        </div>
        <p className="description">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
