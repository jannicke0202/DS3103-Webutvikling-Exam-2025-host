namespace SportsWorldApi.Models
{
    public interface IAthlete
    {
        string Name { get; set; }
        int Age { get; set; }
        string Sport { get; set; }
    }
}
