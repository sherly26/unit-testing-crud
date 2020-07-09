using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boundaries.Persistance.Configurations
{
    public sealed class UserConfiguration : IEntityTypeConfiguration<User>
    {
        void IEntityTypeConfiguration<User>.Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(user => user.ID);
            builder.Property(user => user.Name).HasMaxLength(70);
            builder.Property(user => user.Lastname).HasMaxLength(70);
            builder.Property(user => user.Username).HasMaxLength(70);
            builder.Property(user => user.Email).IsRequired().HasMaxLength(50);
            builder.Property(user => user.Password);
            builder.Property(user => user.Phone).HasMaxLength(20);
            builder.Property(user => user.Address).IsRequired().HasMaxLength(300);
        }
    }
}
