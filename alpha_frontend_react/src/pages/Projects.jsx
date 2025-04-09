import React, { useEffect } from "react";
import ModalButton from "../partials/components/ModalButton";
import ProjectCard from "../partials/components/ProjectCard";
import { useState } from "react";
import ProjectModal from "../partials/components/ProjectModal";
import { addNewProject, deleteProject, getAllProjects, updateProject } from "../api/projectService";

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showStatusSelect, setShowStatusSelect] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [isEditModal, setIsEditModal] = useState(false);
  // Ändrar isModalopen till antingen true eller false beroende på vad den
  // för tillfället är, och på så sätt öppnas eller stängs modalen.
  // handleModalToggle skickas in ModalButton komponenten och används där i onClick.
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditModal(false);
  };

  // Get all helper
  const fetchProjects = async () => {
    const isProjects = await getAllProjects();

    if (isProjects) {
      setProjects(isProjects);
      console.log("Fetch all projects was successful.");
    } else {
      console.log("Could not fetch projects");
    }
  };

  // Create project helper
  const createProject = async (newProjectData) => {
    const isSuccess = await addNewProject(newProjectData);

    if (isSuccess) {
      const updatedProjectList = await getAllProjects();
      if (updatedProjectList) {
        setProjects(updatedProjectList);
        setIsModalOpen(false);
        setShowStatusSelect(false);
        console.log("Project added successfully.");
      } else {
        console.log("Could not fetch updated project list.");
      }
    } else {
      console.log("Could not add project.");
    }
  };

  // Delete project helper
  const removeProject = async (projectId) => {
    const isSuccess = await deleteProject(projectId);

    if (isSuccess) {
      const updatedProjectList = await getAllProjects();
      if (updatedProjectList) {
        setProjects(updatedProjectList);
        console.log("Project removed successfully.");
      }
    } else {
      console.log("Could not remove project.");
    }
  };

  // Update project helper
  const editProject = async (projectId, projectData) => {
    const isSuccess = await updateProject(projectId, projectData);
 console.log(projectData)   
    if (isSuccess) {
      const updatedProjectList = await getAllProjects();
      if (updatedProjectList) {
        setProjects(updatedProjectList);
        setIsModalOpen(false);
        setShowStatusSelect(false);
        console.log("Project updated successfully.");
      }
    } else {
      console.log("Could not update project.");
    }
  };

  // fetchProject körs varje gång användaren går in i /projects
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <ModalButton
          type="add"
          target="#addProjectModal"
          text="Add Project"
          toggleModal={handleModalToggle}
          setShowStatusSelect={setShowStatusSelect}
        />
      </div>

      {/* Modal Add Project */}
      {isModalOpen && (
        <ProjectModal
          toggleModal={handleModalToggle}
          showStatusSelect={showStatusSelect}
          createProject={createProject}
          isEditModal={isEditModal}
          selectedProject={selectedProject}
          editProject={editProject}
        />
      )}

      {/* Cards */}
      {/* Renderar sedan ut ProjectCard Komponenter utifrån så många projekt som finns i databasen */}
      <div className="projects-layout">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            toggleModal={handleModalToggle}
            setShowStatusSelect={setShowStatusSelect}
            removeProject={removeProject}
            setIsEditModal={setIsEditModal}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
