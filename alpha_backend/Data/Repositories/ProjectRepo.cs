using Data.Contexts;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;

namespace Data.Repositories
{
    public interface IProjectRepo : IBaseRepo<ProjectEntity>
    {
    }
    public class ProjectRepo(DataContext context) : BaseRepo<ProjectEntity>(context), IProjectRepo
    {
        public override async Task<IEnumerable<ProjectEntity>> GetAllAsync()
        {
            var entities = await _table
                .Include(x => x.Client)
                .Include(x => x.User)
                .Include(x => x.Status)
                .ToListAsync();

            return entities;
        }

        public override async Task<ProjectEntity?> GetAsync(Expression<Func<ProjectEntity, bool>> expression)
        {
            var entity = await _table
                .Include(x => x.Client)
                .Include(x => x.User)
                .Include(x => x.Status)
                .FirstOrDefaultAsync(expression);

            return entity;
        }
    }
}
