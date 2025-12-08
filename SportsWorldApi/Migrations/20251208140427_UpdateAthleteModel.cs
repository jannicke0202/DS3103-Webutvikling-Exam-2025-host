using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportsWorldApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAthleteModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "numberOfPurchases",
                table: "Finances",
                newName: "NumberOfPurchases");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NumberOfPurchases",
                table: "Finances",
                newName: "numberOfPurchases");
        }
    }
}
