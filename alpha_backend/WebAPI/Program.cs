
using Data.Contexts;
using Data.Repositories;
using Data.Services;
using Microsoft.EntityFrameworkCore;

namespace WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            // Registrerar mina Repositories
            builder.Services.AddScoped<IUserRepo, UserRepo>();
            builder.Services.AddScoped<IClientRepo, ClientRepo>();
            builder.Services.AddScoped<IStatusRepo, StatusRepo>();
            builder.Services.AddScoped<IProjectRepo, ProjectRepo>();
            // Registrerar mina Services
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IClientService, ClientService>();
            builder.Services.AddScoped<IStatusService, StatusService>();
            builder.Services.AddScoped<IProjectService, ProjectService>();
            // Registrerar och konfigurerar min DataContext
            builder.Services.AddDbContext<DataContext>(opt =>
                opt.UseSqlServer(builder.Configuration.GetConnectionString("LocalDB"))
            );

            var app = builder.Build();
            app.MapOpenApi();
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            // Registrerar mina CORS-policyer
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.Run();


        }
    }
}
