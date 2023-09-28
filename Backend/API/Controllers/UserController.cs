using System.Security.Claims;
using API.DTOs;
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

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _userRepository.GetUserByUserNameAsync(userName);
        
        if(user == null) return NotFound();

        _mapper.Map(memberUpdateDto, user);
        if(await _userRepository.SaveAllAsynce()) return NoContent();

        return BadRequest("Failed to update user");
    }
}
