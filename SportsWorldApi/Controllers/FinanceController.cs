using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldApi.Contexts;
using SportsWorldApi.Models;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinanceController(SportsWorldContext context) : ControllerBase
{

    private const int FinanceId = 1;

    [HttpGet()]
    public async Task<ActionResult<Finance>> Get()
    {
        var finance = await context.Finances.FirstOrDefaultAsync();

        // om ingenting finnes, lag ny der man starter med 2m
        if (finance == null)
        {
            finance = new Finance
            {
                Id = FinanceId,
                MoneyLeft = 2000000,
                MoneySpent = 0,
                NumberOfPurchases = 0
            };
            context.Finances.Add(finance);
            await context.SaveChangesAsync();
        }

        return Ok(finance);
    }

    [HttpPost("purchase/{price}")]
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

    [HttpPost("loan/{amount}")]
    public async Task<ActionResult<Finance>> Loan(int amount)
    {
        var finance = await context.Finances.FindAsync(FinanceId);

        if (finance == null)
            return NotFound();

        finance.MoneyLeft += amount;
        await context.SaveChangesAsync();

        return Ok(finance);
    }

   
    private class PurchaseRequest
    {
        public int Price { get; set; }
    }

    [HttpPost("reset")]
public async Task<ActionResult<Finance>> Reset()
{
    var finance = await context.Finances.FirstOrDefaultAsync();

    if (finance == null)
    {
        finance = new Finance
        {
            MoneyLeft = 2_000_000,
            MoneySpent = 0,
            NumberOfPurchases = 0
        };
        context.Finances.Add(finance);
    }
    else
    {
        finance.MoneyLeft = 2_000_000;
        finance.MoneySpent = 0;
        finance.NumberOfPurchases = 0;
    }

    await context.SaveChangesAsync();
    return Ok(finance);
}
}