export const getAllClients = async () => {
  const apiClientsEndpoint = "https://localhost:7234/api/clients/";

  try {
    const response = await fetch(apiClientsEndpoint);
    const clientsData = await response.json();

    return clientsData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
