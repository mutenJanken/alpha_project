export const getAllUsers = async () => {
  const apiUsersEndpoint = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${apiUsersEndpoint}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": import.meta.env.VITE_X_API_KEY,
      },
    });
    const usersData = await response.json();

    return usersData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
