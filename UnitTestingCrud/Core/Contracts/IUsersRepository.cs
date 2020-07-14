using Core.Models;
using System.Collections.Generic;

namespace Core.Contracts
{
    public interface IUsersRepository : IGenericRepository<User>
    {

        /// <summary>
        /// Gets the list of all users registered. 
        /// </summary>
        /// <returns></returns>
        IEnumerable<User> GetUsers();
    }
}
