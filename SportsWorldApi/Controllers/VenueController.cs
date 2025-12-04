using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("[controller]")]

public class VenueController(SportsWorldContext _sportsWorldContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Venue>>> Get()
    {
        try
        {
            List<Venue> venues = await _sportsWorldContext.Venues.ToListAsync();
            return venues;
        }
        catch (DbException)
        {
            return StatusCode(500, "Database Exception");
        }
        catch
        {
            return StatusCode(500, "Server side Exception");
        }
    }
}