using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly DataContext _context ;
    public UserController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<AppUser>> GetUsers()
    {
        var users = _context.Users.ToList();

        return users;
    }

    [HttpGet("{id}")]
    public ActionResult<AppUser> GetUser(int id) => _context.Users.Find(id);
}
