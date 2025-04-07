using Data.Entities;
using Data.Models;
using Data.Repositories;

namespace Data.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync(bool orderByDesc = false);
        Task<Project?> GetProjectByIdAsync(string id);
        Task<bool> AddProjectAsync(AddProjectForm projectForm);
        Task<bool> UpdateProjectAsync(UpdateProjectForm projectForm);
        Task<bool> DeleteProjectAsync(string id);
    }
    public class ProjectService(IProjectRepo projectRepo) : IProjectService
    {
        private readonly IProjectRepo _projectRepo = projectRepo;

        public async Task<IEnumerable<Project>> GetAllProjectsAsync(bool orderByDesc = false)
        {
            var entities = await _projectRepo.GetAllAsync();
            var projects = entities.Select(project => new Project
            {
                Id = project.Id,
                ProjectName = project.ProjectName,
                Description = project.Description,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Budget = project.Budget,
                Created = project.Created,
                Client = new Client
                {
                    Id = project.Client.Id,
                    ClientName = project.Client.ClientName,
                },
                User = new User
                {
                    Id = project.User.Id,
                    FirstName = project.User.FirstName,
                    LastName = project.User.LastName,
                },
                Status = new Status
                {
                    Id = project.Status.Id,
                    StatusName = project.Status.StatusName,
                }
            });
            return orderByDesc
                ? projects.OrderByDescending(projects => projects.Created)
                : projects.OrderBy(projects => projects.Created);
        }

        public async Task<Project?> GetProjectByIdAsync(string id)
        {
            var entity = await _projectRepo.GetAsync(x => x.Id == id);
            return entity == null ? null! : new Project
            {
                Id = entity.Id,
                ProjectName = entity.ProjectName,
                Description = entity.Description,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                Budget = entity.Budget,
                Created = entity.Created,
                Client = new Client
                {
                    Id = entity.Client.Id,
                    ClientName = entity.Client.ClientName,
                },
                User = new User
                {
                    Id = entity.User.Id,
                    FirstName = entity.User.FirstName,
                    LastName = entity.User.LastName,
                },
                Status = new Status
                {
                    Id = entity.Status.Id,
                    StatusName = entity.Status.StatusName,
                }
            };
        }

        public async Task<bool> AddProjectAsync(AddProjectForm projectForm)
        {
            if (projectForm == null)
                return false;

            var newProduct = new ProjectEntity
            {
                ProjectName = projectForm.ProjectName,
                Description = projectForm.Description,
                StartDate = projectForm.StartDate,
                EndDate = projectForm.EndDate,
                Budget = projectForm.Budget,
                ClientId = projectForm.ClientId,
                UserId = projectForm.UserId,
                StatusId = 1
            };

            var result = await _projectRepo.AddAsync(newProduct);
            return result;
        }

        public async Task<bool> UpdateProjectAsync(UpdateProjectForm projectForm)
        {
            if (projectForm == null) 
                return false;

            var productUpdate = new ProjectEntity
            {
                Id = projectForm.Id,
                ProjectName = projectForm.ProjectName,
                Description = projectForm.Description,
                StartDate = projectForm.StartDate,
                EndDate = projectForm.EndDate,
                Budget = projectForm.Budget,
                ClientId = projectForm.ClientId,
                UserId = projectForm.UserId,
                StatusId = projectForm.StatusId
            };

            var result = await _projectRepo.UpdateAsync(productUpdate);
            return result;
        }
         public async Task<bool> DeleteProjectAsync(string id)
        {
            if(string.IsNullOrEmpty(id))
                return false;

            var result = await _projectRepo.DeleteAsync(x => x.Id == id);
            return result;
        }
    }
}
