using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AthleteController(SportsWorldContext _sportsWorldContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            List<Athlete> athletes = await _sportsWorldContext.Athletes.ToListAsync();
            return athletes;
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