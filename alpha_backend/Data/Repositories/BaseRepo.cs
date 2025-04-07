using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Linq.Expressions;

namespace Data.Repositories
{
    public interface IBaseRepo<TEntity> where TEntity : class
    {
        //CRUD
        // Definiera metoder för CRUD utan implementerad kod
        Task<bool> AddAsync(TEntity entity);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> expression);
        Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> expression);
        Task<bool> UpdateAsync(TEntity entity);
        Task<bool> DeleteAsync(Expression<Func<TEntity, bool>> expression);
    }
    public class BaseRepo<TEntity> : IBaseRepo<TEntity> where TEntity : class
    {
        protected readonly DataContext _context;
        protected readonly DbSet<TEntity> _table;

        public BaseRepo(DataContext context)
        {
            _context = context;
            _table = _context.Set<TEntity>();
        }
        //CRUD
        // Implementera metoder för CRUD med kod

        public virtual async Task<bool> AddAsync(TEntity entity)
        {
            if (entity == null)
                return false;

            await _table.AddAsync(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _table.ToListAsync();
        }

        public virtual async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> expression)
        {
            return await _table.FirstOrDefaultAsync(expression);
        }

        public virtual async Task<bool> UpdateAsync(TEntity entity)
        {
            if (entity == null)
                return false;

            _table.Update(entity);
            await _context.SaveChangesAsync();
            return true;

        }

        public virtual async Task<bool> DeleteAsync(Expression<Func<TEntity, bool >> expression)
        {
            if (expression == null)
                return false;

            var entity = await _table.FirstOrDefaultAsync(expression);
            if (entity == null)
                return false;

            _table.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> expression)
        {
            return await _table.AnyAsync(expression);
        }


    }
}
