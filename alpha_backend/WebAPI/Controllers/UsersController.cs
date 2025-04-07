using Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UsersController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users= await _userService.GetAllUsersAsync();
            return Ok(users);
        }
       
    }
}
