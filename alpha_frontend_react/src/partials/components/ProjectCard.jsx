import LandingPageIcon from "../../assets/images/landing-page-icon.svg";
import ProjectDropdownMenu from "./ProjectDropdownMenu";

const ProjectCard = ({
  project,
  handleModalToggle,
  setShowStatusSelect,
  removeProject,
  setIsEditModal,
  setSelectedProject,
  projectMenuId,
  handleMenuToggle,
}) => {
  // const [isdropdownMenuOpen, setIsdropdownMenuOpen] = useState(false);
  const isDropdownMenuOpen = projectMenuId === project.id;
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
          <div
            className="menu"
            onClick={(event) => {
              event.stopPropagation();
              handleMenuToggle(project.id);
            }}
          >
            <i className="fa-solid fa-ellipsis options-menu-icon"></i>
            {isDropdownMenuOpen && (
              <ProjectDropdownMenu
                handleModalToggle={handleModalToggle}
                setShowStatusSelect={setShowStatusSelect}
                project={project}
                removeProject={removeProject}
                setIsEditModal={setIsEditModal}
                setSelectedProject={setSelectedProject}
              />
            )}
          </div>
        </div>
        <p className="description">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
