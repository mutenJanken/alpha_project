import React from "react";
import ModalButton from "../partials/components/ModalButton";
import LandingPageIcon from "../assets/images/landing-page-icon.svg";
import ProjectCard from "../partials/components/ProjectCard";

const Projects = () => {
  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <ModalButton type="add" target="#addProjectModal" text="Add Project" />
      </div>

      {/* Cards */}
      <div className="projects-layout">
        <ProjectCard />
      </div>
    </div>
  );
};

export default Projects;
