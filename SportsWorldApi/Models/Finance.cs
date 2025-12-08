using System.ComponentModel.DataAnnotations;
using SportsWorldApi.Interfaces;

namespace SportsWorldApi.Models;

public class Finance : IFinance
{
    [Key]
    public int Id { get; set; }
    public int MoneyLeft { get; set; }
    public int MoneySpent { get; set; }

    public int NumberOfPurchases { get; set; }
}