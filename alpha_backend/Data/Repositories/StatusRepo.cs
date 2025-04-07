using Data.Contexts;
using Data.Entities;

namespace Data.Repositories
{
    public interface IStatusRepo : IBaseRepo<StatusEntity>
    {
    }
    public class StatusRepo(DataContext context) : BaseRepo<StatusEntity>(context), IStatusRepo
    {
    }
}
