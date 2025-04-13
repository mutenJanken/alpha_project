export const getAllClients = async () => {
  const apiClientsEndpoint = "https://localhost:7234/api/clients/";

  try {
    const response = await fetch(apiClientsEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "OWRjNDZhOGUtMTIzNS00ZWNmLWFhZTQtNWU3ZjQxMzU4MGEx",
      },
    });
    const clientsData = await response.json();

    return clientsData;
  } catch (error) {
    console.log("Error fetching clients data", error);
    return [];
  }
};
