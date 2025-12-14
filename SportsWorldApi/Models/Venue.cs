using System.ComponentModel.DataAnnotations;
using SportsWorldApi.Interfaces;

namespace SportsWorldApi.Models;

    public class Venue : IVenue
    {
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Capacity { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    }
    