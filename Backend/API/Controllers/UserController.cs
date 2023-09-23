using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UserController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    public UserController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
     {  
        var users = await _userRepository.GetUsersAsync();

        var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
        return Ok(usersToReturn);
        
     }
   

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetUser(int id) => await _userRepository.GetUserByIdAsync(id);

    [HttpGet("{userName}")]
    public async Task<ActionResult<MemberDto>> GetUserByUserName(string userName) 
    {
        var user =  await _userRepository.GetUserByUserNameAsync(userName);

        return _mapper.Map<MemberDto>(user);
    }
}
