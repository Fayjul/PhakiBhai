using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {

        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody]RegisterDto registerDto)
        {
            var userName = registerDto.UserName;
            var password = registerDto.Password;
            if(await UserExits(userName))
            {
                return BadRequest("This user name is already exits");
            }
            using var hmac = new HMACSHA512();

            var user = new AppUser 
            {
                UserName = userName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key

            };

            _context.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto{
                UserName = userName,
                Token = _tokenService.CreateToken(user)
            };
        }
        
        

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody]LoginDto loginDto)
        {
            var user = await _context.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if(user == null) return BadRequest("UserName is not Valid");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            
            for(int i = 0;  i < computeHash.Length; i++)
            {
                if(computeHash[i] != user.PasswordHash[i]) return BadRequest("Password is not Valid");
            }
            
            return new UserDto{
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };
        }

        private async Task<bool> UserExits(string userName) 
        {
            return  await _context.Users.AnyAsync(x => x.UserName == userName);
        }
    } 
}