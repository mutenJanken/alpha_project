export const getAllStatuses = async () => {
  const apiStatusesEndpoint = "https://localhost:7234/api/Status/";

  try {
    const response = await fetch(apiStatusesEndpoint);
    const StatusesData = await response.json();

    return StatusesData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
