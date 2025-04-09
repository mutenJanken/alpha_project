// Stötte på lite problem med error hantering och fick ta lite hjälp av copilot.
// Var lite osäker på vart jag skulle logga olika fel. Antingen här i api förfrågan,
// närmast backend servern. Eller om jag skulle göra det i "affärslogiks" funktioner. 
// Som jag förstod det så är det klokast att fånga fel så tidigt som möjligt och logga 
// mer detaljerade felmeddelanden för utvecklaren, men att man kan presentera mer 
// "användarvänliga" fel i "affärslogiks" funktionerna via någon ui komponent eller
// console.log, och på så sätt samtidigt separera ansvar.

export const getAllProjects = async () => {
  const apiProjectsEndpoint = "https://localhost:7234/api/Projects/";
  try {
    const response = await fetch(apiProjectsEndpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    return await response.json();    
  } catch (error) {
    console.error("Error while fetching projects in [getAllProjects]:", error.message);
    return null;
  }
};

export const getProjectById = async (id) => {
  const apiProjectEndpoint = `https://localhost:7234/api/Projects/${id}`;
  try {
    const response = await fetch(apiProjectEndpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch project with ID ${id}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching project in [getProjectById]:", error.message);
    return null;
  }
};

export const addNewProject = async (newProject) => {
  const apiProjectEndpoint = "https://localhost:7234/api/Projects/";
  try {
    const response = await fetch(apiProjectEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error(`Failed to add project: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error adding project in [addNewProject]:", error.message);
    return false;
  }
};

export const updateProject = async (projectId, projectData) => {
  console.log(projectId, projectData);
  const apiProjectEndpoint = `https://localhost:7234/api/Projects/${projectId}`;
  try {
    const response = await fetch(apiProjectEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update project with ID ${projectId}: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error updating in [updateProject]:", error.message);
    return false;
  }
};

export const deleteProject = async (projectId) => {
  const apiProjectEndpoint = `https://localhost:7234/api/Projects/${projectId}`;
  try {
    const response = await fetch(apiProjectEndpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete project with ID ${projectId}: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting project in [deleteProject]:", error.message);
    return false;
  }
};
