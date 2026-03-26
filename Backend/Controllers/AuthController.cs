using Backend.Data;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly MongoDbService _db;

    public AuthController(MongoDbService db)
    {
        _db = db;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(SignupRequest request)
    {
        var existing = await _db.GetUserByEmailAsync(request.Email);
        if (existing != null)
            return BadRequest(new { message = "Email already exists" });

        var user = new Models.User
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        await _db.CreateUserAsync(user);

        return Ok(new { message = "User registered successfully", user = new { user.Id, user.Name, user.Email } });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _db.GetUserByEmailAsync(request.Email);

        if (user == null || string.IsNullOrWhiteSpace(user.PasswordHash) || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password" });

        return Ok(new { message = "Login successful", user = new { user.Id, user.Name, user.Email } });
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _db.GetAllUsersAsync();
        var result = users.Select(u => new { u.Id, u.Name, u.Email });
        return Ok(new { totalCount = users.Count, users = result });
    }
}
