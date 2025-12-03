namespace SportsWorldApi.Interfaces;

interface IFinance
{
    int Id { get; set; }
    int MoneyLeft { get; set; }
    int MoneySpent { get; set; }
}