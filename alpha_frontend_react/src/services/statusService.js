export const getAllStatuses = async () => {
  const apiStatusesEndpoint = "https://localhost:7234/api/Status/";

  try {
    const response = await fetch(apiStatusesEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "OWRjNDZhOGUtMTIzNS00ZWNmLWFhZTQtNWU3ZjQxMzU4MGEx",
      },
    });
    const StatusesData = await response.json();

    return StatusesData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
