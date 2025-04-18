import React, { useEffect, useState } from "react";
import UploadImageIcon from "../../assets/images/upload-image.svg";
import CalendarIcon from "../../assets/images/calendar-icon.svg";
import DropDownIcon from "../../assets/images/dropdown-icon.svg";
import ExitIcon from "../../assets/images/exit-icon.svg";
import DollarIcon from "../../assets/images/dollar-icon.svg";

const ProjectModal = ({
  handleModalToggle,
  showStatusSelect,
  createProject,
  isEditModal,
  editProject,
  selectedProject,
  clients,
  users,
  statuses,
}) => {
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("1");

  const handleModalSubmit = async (event) => {
    event.preventDefault();

    if (isEditModal) {
      const editProjectData = {
        Id: selectedProject.id,
        ProjectName: projectName,
        Description: description,
        StartDate: startDate,
        EndDate: endDate,
        Budget: budget,
        StatusId: parseInt(status, 10),
        ClientId: clientName,
        UserId: projectOwner,
        Created: selectedProject.created,
      };
      await editProject(selectedProject.id, editProjectData);
    } else {
      const addProjectData = {
        projectName,
        description,
        startDate,
        endDate,
        budget,
        status,
        clientId: clientName,
        userId: projectOwner,
      };
      await createProject(addProjectData);
    }
  };

  // Fyller input och select fält med data från projektet som användaren vill redigera.
  // Fick be copilot om hjälp här, speciellt med datumen då dom på serversidan skapas
  // med både datum och tid(någon ISO format), vilken inte kan skrivas ut i input type="date".
  // Lösningen blev att använda .split() och dela respektive datum sträng till en array med
  // två strängar, i det här fallet vid char "T". Så pekar vi på första indexet i
  // arrayen som innehåller datum utan tid.
  useEffect(() => {
    if (isEditModal && selectedProject) {
      setProjectName(selectedProject.projectName || "");
      setClientName(selectedProject.client.id || "");
      setDescription(selectedProject.description || "");
      setStartDate(selectedProject.startDate.split("T")[0] || "");
      setEndDate(selectedProject.endDate.split("T")[0] || "");
      setProjectOwner(selectedProject.user.id || "");
      setBudget(selectedProject.budget || null);
      setStatus(selectedProject.status.id || "");
    }
  }, [isEditModal, selectedProject]);

  return (
    <>
      <form className="modal-container" onClick={handleModalToggle} onSubmit={handleModalSubmit}>
        {/* chatgpt fick hjälpa mig med ( onClick={(event) => event.stopPropagation()} ) då
          själva modalen stängdes när man klickade på den pga event bubbling */}
        <div className="project-modal-open" onClick={(event) => event.stopPropagation()}>
          <div className="top-wrapper">
            <div>
              <h3>{isEditModal ? "Edit Modal" : "Add Project"}</h3>
            </div>
            <div className="exit-icon-wrapper" onClick={handleModalToggle}>
              <img src={ExitIcon} alt="exit-icon" />
            </div>
          </div>
          <div className="project-image-container">
            <img className="upload-image-icon" src={UploadImageIcon} alt="upload-image icon" />
          </div>
          <div className="input-container">
            <label className="label-text">Project Name</label>
            <input
              className="input-field"
              type="text"
              placeholder="Enter Project Name"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label className="label-text">Client Name</label>
            <div className="input-wrapper">
              <select
                className="input-field select"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
                required
              >
                {" "}
                <option value="" disabled hidden>
                  Select Client Name
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
              <div className="select-dropdown">
                <img className="dropdown-icon" src={DropDownIcon} alt="dropdown-icon" />
              </div>
            </div>
          </div>
          <div className="input-container">
            <label className="label-text">Description</label>
            <input
              className="input-field description"
              type="text"
              placeholder="Type something"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>
          <div className="start-end-container">
            <div className="input-container date">
              <label className="label-text">Start Date</label>
              <input
                className="input-field date"
                type="date"
                placeholder="Select End Date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                required
              />
              <div className="calendar-icon-wrapper">
                <img className="calendar-icon" src={CalendarIcon} alt="calendar-icon" />
              </div>
            </div>
            <div className="input-container date">
              <label className="label-text">End Date</label>
              <input
                className="input-field date"
                type="date"
                placeholder="Select End Date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                required
              />
              <div className="calendar-icon-wrapper">
                <img className="calendar-icon" src={CalendarIcon} alt="calendar-icon" />
              </div>
            </div>
          </div>
          <div className="input-container">
            <label className="label-text">Project Owner</label>
            <div className="input-wrapper">
              <select
                className="input-field select"
                value={projectOwner}
                onChange={(event) => setProjectOwner(event.target.value)}
                required
              >
                <option value="" disabled hidden>
                  Select Project Owner
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
              <div className="select-dropdown">
                <img className="dropdown-icon" src={DropDownIcon} alt="dropdown-icon" />
              </div>
            </div>
          </div>
          <div className="input-container">
            <label className="label-text">Budget</label>
            <div className="input-wrapper">
              <input
                className="input-field budget"
                type="number"
                placeholder="0"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                required
              />
              <div className="dollar-wrapper">
                <img className="dollar-icon" src={DollarIcon} alt="dollar-icon" />
              </div>
            </div>
          </div>

          {/* STATUS */}
          {showStatusSelect && (
            <div className="input-container">
              <label className="label-text">Status</label>
              <div className="input-wrapper">
                <select
                  className="input-field select"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  required
                >
                  <option value="" disabled hidden>
                    Select Project Status
                  </option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.statusName}
                    </option>
                  ))}
                </select>
                <div className="select-dropdown">
                  <img className="dropdown-icon" src={DropDownIcon} alt="dropdown-icon" />
                </div>
              </div>
            </div>
          )}

          <div className="create-wrapper">
            <button className="button-create" type="submit">
              {isEditModal ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProjectModal;
