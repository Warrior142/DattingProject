using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DattingApp.API.Data_Layer;
using DattingApp.API.Dtos;
using DattingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DattingApp.API.Controllers {
    [Route ("api/[controller]")]
    public class AuthController : ControllerBase {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController (IAuthRepository repo, IConfiguration config) {
            _config = config;
            _repo = repo;
        }

        [HttpPost ("register")]
        public async Task<IActionResult> Register ([FromBody] UserForRegistorDto userForRegistor) {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            userForRegistor.Username = userForRegistor.Username.ToLower ();
            if (await _repo.UserExists (userForRegistor.Username))
                return BadRequest ("User is already taken");

            var userToCreate = new Users {
                UserName = userForRegistor.Username
            };

            var createUser = await _repo.Register (userToCreate, userForRegistor.Password);
            return StatusCode (201);

        }

        [HttpPost ("login")]
        public async Task<IActionResult> Login ([FromBody] UserForLoginDto userForLoginDto) {
            var userFromRepo = await _repo.Login (userForLoginDto.Username.ToLower (), userForLoginDto.Password);
            if (userFromRepo == null) {
                return Unauthorized ();
            }
            var tokenHandler = new JwtSecurityTokenHandler ();
            var key = Encoding.ASCII.GetBytes (_config.GetSection ("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (new Claim[] {
                new Claim (ClaimTypes.NameIdentifier, userFromRepo.Id.ToString ()),
                new Claim (ClaimTypes.Name, userFromRepo.UserName)
                }),
                Expires = DateTime.Now.AddDays (1),
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key),
                SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken (tokenDescriptor);
            var tokenString = tokenHandler.WriteToken (token);
            return Ok (new { tokenString });
        }
    }
}