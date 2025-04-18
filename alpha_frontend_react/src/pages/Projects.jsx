import React, { useEffect } from "react";
import ModalButton from "../partials/components/ModalButton";
import ProjectCard from "./project_components/ProjectCard";
import { useState } from "react";
import ProjectModal from "./project_components/ProjectModal";
import ProjectStatusTabs from "./project_components/ProjectStatusTabs";
import { addNewProject, deleteProject, getAllProjects, updateProject } from "../services/projectService";
import { getAllClients } from "../services/clientService";
import { getAllUsers } from "../services/userService";
import { getAllStatuses } from "../services/statusService";

const Projects = () => {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showStatusSelect, setShowStatusSelect] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [isEditModal, setIsEditModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [projectMenuId, setprojectMenuId] = useState(null);

  // Ändrar isModalOpen till antingen true eller false beroende på vad den
  // för tillfället är, och på så sätt öppnas eller stängs modalen.
  // Skickas till ModalButton, för att öppna Add Project.
  // Skickas till ProjectCar -> ProjectDropdownMenu för att öppna Edit Project.
  // Skickas till ProjectModal för att kunna stänga Modalen.
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditModal(false);
  };

  const handleMenuToggle = (projectId) => {
    setprojectMenuId(projectMenuId ? null : projectId);
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

  // fetchProject körs varje gång användaren går in i /projects så att
  // ProjectCards kan renderas.
  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  useEffect(() => {
    fetchProjects();
    getAllClients().then(setClients);
    getAllUsers().then(setUsers);
    getAllStatuses().then(setStatuses);
  }, []);

  return (
    <div id="projects">
      {/* Modal button */}
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <ModalButton
          type="add"
          target="#addProjectModal"
          text="Add Project"
          handleModalToggle={handleModalToggle}
          setShowStatusSelect={setShowStatusSelect}
        />
      </div>

      {/* Menu filter */}
      {/* Fick be copilot om hjälp med active, lyckades inte själv. */}
      <ProjectStatusTabs projects={projects} setActiveFilter={setActiveFilter} activeFilter={activeFilter} />

      {/* Modal Add Project */}
      {isModalOpen && (
        <ProjectModal
          handleModalToggle={handleModalToggle}
          showStatusSelect={showStatusSelect}
          createProject={createProject}
          isEditModal={isEditModal}
          selectedProject={selectedProject}
          editProject={editProject}
          clients={clients}
          users={users}
          statuses={statuses}
        />
      )}

      {/* Cards */}
      {/* Renderar ut alla kort om activeFilter är satt till "all".
          Om active filter är "completed" så renderas bara projekten som har project.status.id === 2. */}
      <div className="projects-layout" onClick={handleMenuToggle}>
        {projects
          .sort((projectA, projectB) => new Date(projectB.created) - new Date(projectA.created))
          .filter((project) => activeFilter === "all" || project.status.id === 2)
          .map((filteredProject) => (
            <ProjectCard
              key={filteredProject.id}
              project={filteredProject}
              handleModalToggle={handleModalToggle}
              setShowStatusSelect={setShowStatusSelect}
              removeProject={removeProject}
              setIsEditModal={setIsEditModal}
              setSelectedProject={setSelectedProject}
              projectMenuId={projectMenuId}
              setprojectMenuId={setprojectMenuId}
              handleMenuToggle={handleMenuToggle}
            />
          ))}
      </div>
    </div>
  );
};

export default Projects;
