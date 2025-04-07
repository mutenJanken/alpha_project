using Data.Models;
using Data.Repositories;

namespace Data.Services
{
    public interface IClientService
    {
        Task<Client> GetClientByIdAsync(string id);
        Task<IEnumerable<Client>> GetAllClientsAsync();
    }
    public class ClientService(IClientRepo clientRepo) : IClientService
    {
        private readonly IClientRepo _clientRepo = clientRepo;

        public async Task<IEnumerable<Client>> GetAllClientsAsync()
        {
            var entities = await _clientRepo.GetAllAsync();
            var clients = entities.Select(client => new Client
            {
                Id = client.Id,
                ClientName = client.ClientName,
            });
            return clients;
        }

        public async Task<Client> GetClientByIdAsync(string id)
        {
            var client = await _clientRepo.GetAsync(x => x.Id == id);
            return client == null ? null! : new Client
            {
                Id = client.Id,
                ClientName = client.ClientName,
            };
        }
    }
}
