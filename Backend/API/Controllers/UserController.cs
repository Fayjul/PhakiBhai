using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
public class UserController : BaseApiController
{
    private readonly DataContext _context;
    public UserController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() => await _context.Users.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetUser(int id) => await _context.Users.FindAsync(id);
}
