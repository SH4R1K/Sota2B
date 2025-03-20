using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Sota2B.API.Converters;
using Sota2B.API.Dto;
using Sota2B.DAL.Data;
using Sota2B.DM.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IConverter<User, UserDto>, UserToDtoConverter>();
builder.Services.AddScoped<IConverter<User, UserDetailsDto>, UserToDetailsDtoConverter>();
builder.Services.AddScoped<IConverter<User, UserRankedDto>, UserToRankedDtoConverter>();
builder.Services.AddScoped<IConverter<Purchase, PurchaseDto>, PurchaseToDtoConverter>();
builder.Services.AddScoped<IConverter<Event, EventDetailsDto>, EventToDtoConverter>();
builder.Services.AddScoped<IConverter<Achievement, AchievementDto>, AchievementToDtoConverter>();
// Add services to the container.
builder.Services.AddDbContext<Sota2BContext>(options =>
{
    options.UseSqlite("Data Source=little.db");
});
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(options =>
    {
        options.DocumentPath = "openapi/v1.json";
    });
}

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<Sota2BContext>();
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}
app.Run();
