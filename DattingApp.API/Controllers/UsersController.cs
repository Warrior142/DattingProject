using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DattingApp.API.Data_Layer;
using DattingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace DattingApp.API.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    public class UsersController : ControllerBase {
        private readonly IDatingRepositoy _repo;
        private readonly IMapper _mapper;

        public UsersController (IDatingRepositoy repo, IMapper mapper) {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers () {
            var users = await _repo.GetUsers ();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>> (users);
            return Ok (usersToReturn);
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetUser (int id) {
            var user = await _repo.GetUser (id);
            var userToReturn = _mapper.Map<UserForDetailsDto> (user);
            return Ok (userToReturn);
        }

    }
}