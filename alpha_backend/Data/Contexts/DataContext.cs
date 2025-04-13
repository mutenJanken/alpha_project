using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Contexts
{
    // Utan IdentityUser
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<ClientEntity> Clients { get; set; }
        public DbSet<StatusEntity> Statuses { get; set; }
        public DbSet<ProjectEntity> Projects { get; set; }
    }

    //public class DataContext(DbContextOptions<DataContext> options) : IdentityDbContext<UserEntity>(options)
    //{
    //    public DbSet<ClientEntity> Clients { get; set; }
    //    public DbSet<StatusEntity> Statuses { get; set; }
    //    public DbSet<ProjectEntity> Projects { get; set; }
    //}
}
