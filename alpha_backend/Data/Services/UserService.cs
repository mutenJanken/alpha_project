using Data.Models;
using Data.Repositories;

namespace Data.Services
{
    public interface IUserService
    {
        Task<User> GetUserByIdAsync(string id);
        Task<IEnumerable<User>> GetAllUsersAsync();
    }
    public class UserService(IUserRepo userRepo) : IUserService
    {
        private readonly IUserRepo _userRepo = userRepo;

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            var entities = await _userRepo.GetAllAsync();
            var users = entities.Select(user => new User
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
            });

            return users;
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            var user = await _userRepo.GetAsync(x => x.Id == id);
            return user == null ? null! : new User
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
        }
    }
}
