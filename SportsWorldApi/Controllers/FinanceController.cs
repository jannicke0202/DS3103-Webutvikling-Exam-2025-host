using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinanceController(SportsWorldContext context) : ControllerBase
{
    [HttpGet()]
    public async Task<ActionResult<Finance>> Get()
    {
        var finance = await context.Finances.FirstOrDefaultAsync();

        // om ingenting finnes, lag ny der man starter med 2m
        if (finance == null)
        {
            finance = new Finance
            {
                MoneyLeft = 2000000,
                MoneySpent = 0,
                NumberOfPurchases = 0
            };
            context.Finances.Add(finance);
            await context.SaveChangesAsync();
        }

        return Ok(finance);
    }

    [HttpPost("purchase")]
    public async Task<ActionResult<Finance>> Purchase(int price)
    {
        var finance = await context.Finances.FirstOrDefaultAsync();

        if (finance == null)
            return NotFound();

        if (finance.MoneyLeft < price)
            return BadRequest("Not enough money!");

        finance.MoneyLeft      -= price;
        finance.MoneySpent     += price;
        finance.NumberOfPurchases += 1;

        await context.SaveChangesAsync();

        return Ok(finance);
    }

   
    private class PurchaseRequest
    {
        public int Price { get; set; }
    }
}