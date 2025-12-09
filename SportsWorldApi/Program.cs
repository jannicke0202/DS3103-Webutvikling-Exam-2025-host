using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<SportsWorldContext>(
    options => options.UseSqlite("Data Source=Databases/SportsWorld.db")
);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
    });
});

var app = builder.Build();

DefaultFilesOptions options = new DefaultFilesOptions();
options.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(options);

app.UseStaticFiles();

// Ny funksjon

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SportsWorldContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
