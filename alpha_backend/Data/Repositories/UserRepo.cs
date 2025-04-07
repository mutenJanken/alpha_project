using Data.Contexts;
using Data.Entities;

namespace Data.Repositories
{
    public interface IUserRepo : IBaseRepo<UserEntity>
    {
    }
    public class UserRepo(DataContext context) : BaseRepo<UserEntity>(context), IUserRepo
    {
    }
}
