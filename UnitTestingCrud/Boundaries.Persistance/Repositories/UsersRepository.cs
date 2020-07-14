using Boundaries.Persistence;
using Core.Contracts;
using Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace Boundaries.Persistance.Repositories
{
    public sealed class UsersRepository : BaseRepository<User>, IUsersRepository
    {
        private readonly DbContextCrud _context;

        /// <summary>
        /// Initializes a new instance of a <see cref="UsersRepository"/> class.
        /// </summary>
        /// <param name="context"> Integra database context. </param>
        public UsersRepository(DbContextCrud context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users = _context.Users.ToList();

            return users;
        }
    }
}
