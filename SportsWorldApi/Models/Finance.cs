using System.ComponentModel.DataAnnotations;
using SportsWorldApi.Interfaces;

namespace SportsWorldApi.Models;

public class Finance : IFinance
{
    [Key]
    public int Id { get; set; } = 1;
    public int MoneyLeft { get; set; } = 2000000;
    public int MoneySpent { get; set; } = 0;

    public int NumberOfPurchases { get; set; } = 0;
}