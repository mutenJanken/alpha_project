export const getAllUsers = async () => {
  const apiUsersEndpoint = "https://localhost:7234/api/users/";

  try {
    const response = await fetch(apiUsersEndpoint);
    const usersData = await response.json();

    return usersData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
