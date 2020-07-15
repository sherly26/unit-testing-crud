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


        ///  <inheritdoc/>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasSequence<int>("User_seq", schema: "dbo")
                .StartsAt(0)
                .IncrementsBy(1);

            modelBuilder.Entity<User>()
                .Property(o => o.ID)
                .HasDefaultValueSql("NEXT VALUE FOR dbo.User_seq");
        }
    }

}

