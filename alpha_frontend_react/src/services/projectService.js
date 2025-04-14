// Stötte på lite problem med error hantering och fick ta lite hjälp av copilot.
// Var lite osäker på vart jag skulle logga olika fel. Antingen här i api förfrågan,
// närmast backend servern. Eller om jag skulle göra det i "affärslogiks" funktioner.
// Som jag förstod det så är det klokast att fånga fel så tidigt som möjligt och logga
// mer detaljerade felmeddelanden för utvecklaren, men att man kan presentera mer
// "användarvänliga" fel i "affärslogiks" funktionerna via någon ui komponent eller
// console.log, och på så sätt samtidigt separera ansvar.
const API_KEY = import.meta.env.VITE_X_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const getAllProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
      },
    });
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
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
      },
    });
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
  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
      },
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
  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
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
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": import.meta.env.VITE_X_API_KEY,
      },
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
