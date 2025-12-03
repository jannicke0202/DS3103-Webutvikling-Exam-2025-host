using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Models;


namespace SportsWorldApi.Contexts;

public class SportsWorldContext(DbContextOptions<SportsWorldContext> options) : DbContext(options)
{

    //legg til de andre db settene under her
    //TODO: Athletes og Venue db set
    public DbSet<Models.Finance> Finances { get; set; }

}