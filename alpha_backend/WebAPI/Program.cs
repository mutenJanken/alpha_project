
using Data.Contexts;
using Data.Repositories;
using Data.Services;
using Microsoft.EntityFrameworkCore;
using WebAPI.Extensions.Middlewares;

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
                opt.UseSqlServer(builder.Configuration.GetConnectionString("SqlConnection"))
            );


            var app = builder.Build();
            // Middlewares
            app.MapOpenApi();
            app.UseHttpsRedirection();
            // Registrerar mina CORS-policyer
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseMiddleware<DefaultApiKeyMiddleware>();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();


        }
    }
}
