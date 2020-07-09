using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Boundaries.Persistance
{
    public class DbContextCrud : DbContext
    {
        /// <summary>
        /// Represents the users table.
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Creates an instance of <see cref="DbContextCrud"/>
        /// </summary>
        /// <param name="options"> Context options. </param>
        public DbContextCrud(DbContextOptions<DbContextCrud> options) : base(options)
        {

        }

        /// <inheritdoc />
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => base.OnConfiguring(optionsBuilder);

    }
}
