export const getAllUsers = async () => {
  const API_KEY = import.meta.env.VITE_X_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
      },
    });
    const usersData = await response.json();

    return usersData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
