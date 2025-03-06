using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sota2B.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AchievmentFixForeign : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Achievment_AchievmentId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_UserHasAchievments_Achievment_IdAchievment",
                table: "UserHasAchievments");

            migrationBuilder.DropIndex(
                name: "IX_Events_AchievmentId",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Achievment",
                table: "Achievment");

            migrationBuilder.DropColumn(
                name: "AchievmentId",
                table: "Events");

            migrationBuilder.RenameTable(
                name: "Achievment",
                newName: "Achievments");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Achievments",
                table: "Achievments",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Achievments_IdEvent",
                table: "Achievments",
                column: "IdEvent",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Achievments_Events_IdEvent",
                table: "Achievments",
                column: "IdEvent",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserHasAchievments_Achievments_IdAchievment",
                table: "UserHasAchievments",
                column: "IdAchievment",
                principalTable: "Achievments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Achievments_Events_IdEvent",
                table: "Achievments");

            migrationBuilder.DropForeignKey(
                name: "FK_UserHasAchievments_Achievments_IdAchievment",
                table: "UserHasAchievments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Achievments",
                table: "Achievments");

            migrationBuilder.DropIndex(
                name: "IX_Achievments_IdEvent",
                table: "Achievments");

            migrationBuilder.RenameTable(
                name: "Achievments",
                newName: "Achievment");

            migrationBuilder.AddColumn<int>(
                name: "AchievmentId",
                table: "Events",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Achievment",
                table: "Achievment",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Events_AchievmentId",
                table: "Events",
                column: "AchievmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Achievment_AchievmentId",
                table: "Events",
                column: "AchievmentId",
                principalTable: "Achievment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserHasAchievments_Achievment_IdAchievment",
                table: "UserHasAchievments",
                column: "IdAchievment",
                principalTable: "Achievment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
