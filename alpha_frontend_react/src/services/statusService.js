export const getAllStatuses = async () => {
  const apiStatusesEndpoint = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${apiStatusesEndpoint}/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": import.meta.env.VITE_X_API_KEY,
      },
    });
    const StatusesData = await response.json();

    return StatusesData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
