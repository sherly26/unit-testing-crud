using Microsoft.EntityFrameworkCore.Migrations;

namespace Boundaries.Persistance.Migrations
{
    public partial class AddedUserIdAutoincrement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateSequence<int>(
                name: "User_seq",
                schema: "dbo",
                startValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ID",
                table: "Users",
                nullable: false,
                defaultValueSql: "NEXT VALUE FOR dbo.User_seq",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropSequence(
                name: "User_seq",
                schema: "dbo");

            migrationBuilder.AlterColumn<string>(
                name: "ID",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldDefaultValueSql: "NEXT VALUE FOR dbo.User_seq");
        }
    }
}
