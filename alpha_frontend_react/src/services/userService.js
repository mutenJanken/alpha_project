export const getAllUsers = async () => {
  const apiUsersEndpoint = "https://localhost:7234/api/users/";

  try {
    const response = await fetch(apiUsersEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "OWRjNDZhOGUtMTIzNS00ZWNmLWFhZTQtNWU3ZjQxMzU4MGEx",
      },
    });
    const usersData = await response.json();

    return usersData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
