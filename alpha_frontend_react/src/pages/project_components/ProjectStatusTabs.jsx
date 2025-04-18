import React from "react";

const ProjectStatusTabs = ({ projects, setActiveFilter, activeFilter }) => {
  
  return (
    <div className="menu-filter">
      <div>
        <button
          className={`button-filter all ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          {`ALL[${projects.length}]`}
        </button>
        <div className={`button-filter-bottom ${activeFilter === "all" ? "highlighted" : ""}`}></div>
      </div>
      <div>
        <button
          className={`button-filter completed ${activeFilter === "completed" ? "active" : ""}`}
          onClick={() => setActiveFilter("completed")}
        >
          {`COMPLETED[${projects.filter((project) => project.status.id === 2).length}]`}
        </button>
        <div className={`button-filter-bottom ${activeFilter === "completed" ? "highlighted" : ""}`}></div>
      </div>
    </div>
  );
};

export default ProjectStatusTabs;
