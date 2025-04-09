import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";

const ProjectDropdownMenu = ({
  toggleModal,
  setShowStatusSelect,
  project,
  removeProject,
  setIsEditModal,
  setSelectedProject
}) => {
  return (
    <div className="menu-container">
      <div className="menu-open">
        <button
          className="menu-button edit"
          type="button"
          onClick={() => {
            setShowStatusSelect(true);
            toggleModal();
            setIsEditModal(true);
            setSelectedProject(project)
          }}
        >
          <img className="edit-icon" src={EditIcon} alt="edit-icon" />
          <div className="edit-text">Edit</div>
        </button>
        <button className="menu-button delete" onClick={() => removeProject(project.id)}>
          <img className="delete-icon" src={DeleteIcon} alt="delete-icon" />
          <div className="delete-text">Delete Project</div>
        </button>
      </div>
      <div className="box-shadow-behind-menu">bakom</div>
    </div>
  );
};

export default ProjectDropdownMenu;
