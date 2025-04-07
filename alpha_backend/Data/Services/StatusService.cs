using Data.Models;
using Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services
{
    public interface IStatusService
    {
        Task<IEnumerable<Status>> GetALlStatusesAsync();
        Task<Status> GetStatusByIdAsync(int id);
    }

    public class StatusService(IStatusRepo statusRepo) : IStatusService
    {
        private readonly IStatusRepo _statusRepo = statusRepo;
        public async Task<IEnumerable<Status>> GetALlStatusesAsync()
        {
            var entities = await _statusRepo.GetAllAsync();
            var statuses = entities.Select(status => new Status
            {
                Id = status.Id,
                StatusName = status.StatusName,
            });
            return statuses;
        }

        public async Task<Status> GetStatusByIdAsync(int id)
        {
            var status = await _statusRepo.GetAsync(x => x.Id == id);
            return status == null ? null! : new Status
            {
                Id = status.Id,
                StatusName = status.StatusName,
            };
        }
    }

}
