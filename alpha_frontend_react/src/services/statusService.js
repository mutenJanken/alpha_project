export const getAllStatuses = async () => {
  const API_KEY = import.meta.env.VITE_X_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${API_URL}/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
      },
    });
    const StatusesData = await response.json();

    return StatusesData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
