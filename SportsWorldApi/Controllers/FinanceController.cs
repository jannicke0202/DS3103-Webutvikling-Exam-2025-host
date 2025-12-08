using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

//hei :p

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("api/[controller]")]

public class FinanceController(SportsWorldContext _sportsWorldContext) : ControllerBase //kanskje rename _sportsworldcontext til _financecontext?
{
    [HttpGet]
    public async Task<ActionResult<List<Finance>>> Get()
    {
        try
        {
            List<Finance> finances = await _sportsWorldContext.Finances.ToListAsync();
            return finances;
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