export const getAllClients = async () => {
  const apiClientsEndpoint = `${import.meta.env.VITE_API_URL}`;

  try {
    const response = await fetch(`${apiClientsEndpoint}/clients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": import.meta.env.VITE_X_API_KEY,
      },
    });
    const clientsData = await response.json();

    return clientsData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
