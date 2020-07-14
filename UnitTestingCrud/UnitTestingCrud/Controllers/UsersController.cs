using Core.Contracts;
using Core.Managers;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UnitTestingCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public sealed class UsersController : ControllerBase
    {
        private readonly UsersManager _usersManager;

        public UsersController(UsersManager usersManager)
        {
            _usersManager = usersManager;
        }


        /// <summary>
        ///Creates user on persistence.
        /// </summary>
        /// <param name="user">representation of user.</param>
        /// <returns>Returns <see cref="IActionResult"/> For this operation </returns>
        [HttpPost]
        public async Task<IActionResult> SaveUser([FromBody] User user)
        {
            IOperationResult<string> createUserResult = await _usersManager.PersistUser(user);

            if (!createUserResult.Success)
            {
                return BadRequest(createUserResult.Message);
            }

            return Ok();
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> SearchUser (User username)
        {
            IOperationResult<User> userFoundResult = await _usersManager.SearchUser(username);

            if (!userFoundResult.Success)
            {
                return BadRequest(userFoundResult.Message);
            }

            return Ok();
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            IOperationResult<IEnumerable<User>> userFoundResult = _usersManager.GetUsers();

            if (!userFoundResult.Success)
            {
                return BadRequest(userFoundResult.Message);
            }

            return Ok();
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateUser (User user)
        {
            IOperationResult<string> userToUpdateResult = await _usersManager.UpdateUser(user);

            if (!userToUpdateResult.Success)
            {
                return BadRequest(userToUpdateResult.Message);
            }

            return Ok();
        }

        [HttpDelete("{username}")]
        public async Task<IActionResult> DeleteUser (string username)
        {
            IOperationResult<string> deletedUserResult = await _usersManager.DeleteUser(username);

            if (!deletedUserResult.Success)
            {
                return BadRequest(deletedUserResult.Message);
            }

            return Ok();
        }

    }
}
