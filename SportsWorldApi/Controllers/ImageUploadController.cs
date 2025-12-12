using Microsoft.AspNetCore.Mvc;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ImageUploadController(IWebHostEnvironment _webHostEnvironment) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Post(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        try
        {

            string webRootPath = _webHostEnvironment.WebRootPath;
            string absolutePath = Path.Combine(webRootPath, "images/athletes", file.FileName);

            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            string url = $"/images/athletes/{file.FileName}";

            return Created(url, new { url });

        }
        catch (Exception ex)
        {
            Console.WriteLine("UPLOAD ERROR: " + ex.Message);
            return StatusCode(500, ex.Message);
        }

    }
}