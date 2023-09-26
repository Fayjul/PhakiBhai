using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UserController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    
    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository; 
    }

    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers() => 
        Ok(await _userRepository.GetMembersAsync()); 
    
   

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetUser(int id) => await _userRepository.GetUserByIdAsync(id);
    
    [HttpGet("{userName}")]
    public async Task<ActionResult<MemberDto>> GetUserByUserName(string userName) 
    {
        return await _userRepository.GetMemberAsync(userName);
    }
}
