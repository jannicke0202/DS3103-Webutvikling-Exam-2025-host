using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

namespace SportsWorldApi.Controllers;

// Følgende kode bygger på CRUD fra pensum (CreateReadUpdateDelete)
[ApiController]
[Route("api/[controller]")]
public class AthleteController(SportsWorldContext _sportsWorldContext) : ControllerBase
{
    // Get all
    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            List<Athlete> athletes = await _sportsWorldContext.Athletes.ToListAsync();
            return Ok(athletes);
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

    // Get by id
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Athlete>> GetById(int id)
    {
        try
        {
            var athlete = await _sportsWorldContext.Athletes.FindAsync(id);

            if (athlete == null)
                return NotFound();

            return Ok(athlete);
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

    // Get
    [HttpGet("search")]
    public async Task<ActionResult<List<Athlete>>> GetByName([FromQuery] string name)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(name))
                return BadRequest("Name query is required.");

            var results = await _sportsWorldContext.Athletes
                .Where(a => a.Name.Contains(name))
                .ToListAsync();

            return Ok(results);
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
    public async Task<ActionResult<Athlete>> Create([FromBody] Athlete athlete)
    {
        try
        {
           
            athlete.Id = 0;

            _sportsWorldContext.Athletes.Add(athlete);
            await _sportsWorldContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = athlete.Id }, athlete);
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

    // Update
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Athlete>> Update(int id, [FromBody] Athlete updated)
    {
        try
        {
            var athlete = await _sportsWorldContext.Athletes.FindAsync(id);
            if (athlete == null)
                return NotFound();

            athlete.Name = updated.Name;
            athlete.Gender = updated.Gender;
            athlete.Price = updated.Price;
            athlete.Image = updated.Image;
            athlete.PurchaseStatus = updated.PurchaseStatus;

            await _sportsWorldContext.SaveChangesAsync();

            return Ok(athlete);
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

    // PurchaseStatus
    [HttpPatch("{id:int}/purchase")]
    public async Task<ActionResult<Athlete>> TogglePurchaseStatus(int id)
    {
        try
        {
            var athlete = await _sportsWorldContext.Athletes.FindAsync(id);
            if (athlete == null)
                return NotFound();

            athlete.PurchaseStatus = !athlete.PurchaseStatus;
            await _sportsWorldContext.SaveChangesAsync();

            return Ok(athlete);
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

    // Delete
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var athlete = await _sportsWorldContext.Athletes.FindAsync(id);
            if (athlete == null)
                return NotFound();

            _sportsWorldContext.Athletes.Remove(athlete);
            await _sportsWorldContext.SaveChangesAsync();

            return NoContent();
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



/*[ApiController]
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
}*/