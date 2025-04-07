using Data.Models;
using Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController(IProjectService projectService) : ControllerBase
    {
        private readonly IProjectService _projectService = projectService;


        [HttpPost]
        public async Task<IActionResult> Add(AddProjectForm projectForm)
        {
            if (!ModelState.IsValid)
                return BadRequest(projectForm);

            var result = await _projectService.AddProjectAsync(projectForm);
            return result ? Ok() : BadRequest();
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // Använd true elle false som argument i GetAllProjectsAsync() för att
            // hämta projekten i ordning eller omvänt ordning.
            var projects = await _projectService.GetAllProjectsAsync(orderByDesc: true);
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            return project == null ? null! : Ok(project);     
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateProjectForm projectForm)
        {
            if (!ModelState.IsValid)
                return BadRequest(projectForm);

            var result = await _projectService.UpdateProjectAsync(projectForm);
            return result ? Ok() : NotFound();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if(string.IsNullOrEmpty(id))
                return BadRequest();

            var result = await _projectService.DeleteProjectAsync(id);
            return result ? Ok() : NotFound();
        }   
    }

}
