using Microsoft.AspNetCore.Mvc;

namespace SportsWorldApi.Controllers;

[ApiController]
[Route("/api/controller")]

public class ImageUploadController(IWebHostEnvironment _webHostEnvironment) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Post(IFormFile file)
    {
        try
        {
            string webRootPath = _webHostEnvironment.WebRootPath;
            string absolutePath = Path.Combine(webRootPath, "image", file.FileName);

            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Created();

        }
        catch
        {
            return StatusCode(500);
        }
    }
}