using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VenueController : ControllerBase
{
    private readonly SportsWorldContext _sportsWorldContext;

    public VenueController(SportsWorldContext sportsWorldContext)
    {
        _sportsWorldContext = sportsWorldContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Venue>>> Get()
    {
        try
        {
            var venues = await _sportsWorldContext.Venues.ToListAsync();
            return Ok(venues);
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

    [HttpPost]
    public async Task<ActionResult<Venue>> Post([FromBody] Venue venue)
    {
        try
        {
            venue.Id = 0;
            _sportsWorldContext.Venues.Add(venue);
            await _sportsWorldContext.SaveChangesAsync();

            return Ok(venue);
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
