namespace SportsWorldApi.Interfaces;

interface IVenue
{
    int Id { get; set; }
    string Name { get; set; }
    string Capacity { get; set; } 
    string Image { get; set; } 
}