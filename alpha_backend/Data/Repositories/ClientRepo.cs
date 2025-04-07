using Data.Contexts;
using Data.Entities;

namespace Data.Repositories
{
    public interface IClientRepo : IBaseRepo<ClientEntity>
    {
    }
    public class ClientRepo(DataContext context) : BaseRepo<ClientEntity>(context), IClientRepo
    {
    }
}
